require("dotenv").config()
const express = require("express")
const aiRouter = express.Router()

const { GoogleGenerativeAI } = require("@google/generative-ai")

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

aiRouter.post("/chat", async (req, res) => {
    try {
        const { message } = req.body

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash"
        })

        const result = await model.generateContent(message)

        const reply = result.response.text()

        res.json({ success: true, reply })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error: "AI error" })
    }
})

aiRouter.post("/review-code", async (req, res) => {
    console.log("hit")

    try {
        const { code, language } = req.body

        if (!code) {
            return res.status(400).json({ error: "Code required" })
        }

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash"
        })

        const prompt = `
You are a senior software engineer.

Review the following ${language} code.
Limit response to under 150 words.

### Bugs
- bullet points

### Improvements
- bullet points

### Optimized Code
Return only improved code.

Code:
${code}
`

        const result = await model.generateContent(prompt)

        const review = result.response.text()

        res.json({ success: true, review })

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "AI review failed" })
    }
})

module.exports = aiRouter