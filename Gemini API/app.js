require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");
const express = require("express");
const cors = require("cors");

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// setup AI
const ai = new GoogleGenAI({
  apiKey: process.env.API_KEY_NAME,
});

const model = "gemini-3-flash-preview";

// route to post request to AI
app.post("/api", async (req, res) => {
  try {
    const { prompt } = req.body;

    // check if prompt is being asked

    if (!prompt) {
      return res.status(400).json({ message: "No prompt being asked" });
    }

    // full prompt with custom instructions for the AI
    const knowledge = `
This website is a portfolio of Chhumsomary, an ICT and Data Science student.
He has experience in AI, web development, and cloud computing.
Projects include:
- AI posture detection (won national competition)
- UniSites platform for students in Cambodia
- Full-stack e-commerce app using Node.js

Skills:
- JavaScript, Python, React, Node.js
- Machine Learning and Computer Vision
`;
    const fullPrompt = `
You are an AI assistant for a personal portfolio website.

Answer based on the information below and act like you are the person with the identity of the website owner. You can also answer questions about yourself based on the information provided.
If the answer is not in the information, say "I don't know based on the provided data."

Information:
${knowledge}

User question:
${prompt}
`;
    const result = await ai.models.generateContent({
      model: model,
      contents: fullPrompt,
    });

    res.status(200).json({ text: result.text });
  } catch (error) {
    console.error("AI Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
