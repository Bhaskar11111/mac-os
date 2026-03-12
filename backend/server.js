import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => {
  res.send("Hercules AI backend running");
});

app.post("/review-code", async (req, res) => {

  try {

    const { code, language } = req.body;

    if (!code) {
      return res.status(400).json({ error: "Code required" });
    }

    const prompt = `
You are a senior software engineer.

Review the following ${language} code.
Limit response to under 150 words.
Focus on clarity and brevity.

Return a SHORT and CLEAR review using this format:

### Bugs
- bullet points

### Improvements
- bullet points

### Optimized Code
Return only the improved code in a code block.

Code:
${code}
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
        })
      }
    );

    const data = await response.json();

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from AI";

    res.json({ review: text });

  } catch (error) {

    console.error("Gemini Error:", error);

    res.status(500).json({
      error: "AI review failed",
      details: error.message
    });

  }

});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});