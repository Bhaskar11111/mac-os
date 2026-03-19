const express = require("express")
const app = express()

const cors = require("cors")
const cookieParser = require("cookie-parser")

const aiRouter = require("./routes/ai.route")
const authRouter=require('./routes/auth.route')

app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use("/api", aiRouter)
app.use('/api/auth',authRouter)

module.exports = app