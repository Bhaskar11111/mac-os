import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./src/routes/authRoutes.js";
import profileRoutes from "./src/routes/profileRoutes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}));
app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => {
  res.send("Hercules AI backend running");
});

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);

const reviewCodeHandler = async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code) {
      return res.status(400).json({ error: "Code required" });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: "AI review failed",
        details: "GEMINI_API_KEY is not configured"
      });
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

    if (!response.ok) {
      return res.status(response.status).json({
        error: "AI review failed",
        details:
          data?.error?.message ||
          data?.message ||
          "Gemini API request failed"
      });
    }

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
};

app.post("/review-code", reviewCodeHandler);
app.post("/api/review-code", reviewCodeHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || process.env.CONNECTION_STRING;

    if (mongoUri) {
      await mongoose.connect(mongoUri);
      console.log("MongoDB connected");
    } else {
      console.warn("MONGODB_URI is not configured; profile/auth endpoints need MongoDB");
    }

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
