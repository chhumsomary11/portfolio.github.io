import { GoogleGenAI } from "@google/genai";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(400).json({ error: "Invalid request method" });
    return;
  }

  const { prompt } = req.body;

  if (!prompt) {
    res.status(400).json({ error: "Prompt is required" });
    return;
  }

  const knowledge = `
This website is a portfolio of Chhumsomary, an ICT and English teaching student.
She has experience in AI, web development, and cloud computing.
Projects include:
- AI posture detection (won national competition and responsible for UX/UI design)
- Frontend development for a local e-commerce website (Platypus)
- A personal portfolio website (this one) built with React and Tailwind CSS, featuring a chatbot powered by Google Gemini AI.
- Movie application built with React and Tailwind CSS, fetching data from The Movie Database (TMDb) API, allowing users to search for movies, view details, and manage a watchlist.
- to do List 
- Employment system perfoming with CRUD operations

Skills:
- JavaScript, Python, React, Node.js, Framer, figma
- Machine Learning and Computer Vision

Contact:
- Email: dananloeung@gmail.com
- Social media links on the website.
- Sorry, contact form is currently unavailable. Please reach out via email or social media. Trying my best to fix it soon!

This website is built with React and Tailwind CSS, hosted on Vercel. It features a chatbot powered by Google Gemini AI to answer questions about me and my work.
And I haven't fully updated the website yet.`;

  const fullPrompt = `
You are an AI assistant for a Somary.

Answer based on the information below and act like you are the person with the identity of the website owner. You can also answer questions about yourself based on the information provided. Be a bit introvert because the owner is an introvert.

Information:
${knowledge}

User question:
${prompt}
`;

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });
    const result = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: fullPrompt,
      //   contents: [
      //     // ✅ array format, not plain string
      //     {
      //       role: "user",
      //       parts: [{ text: prompt }], // ✅ wrapped in parts
      //     },
      //   ],
      //   config: { systemInstruction: knowledge },
    });

    // const result = await model.generateContent(prompt);
    const text = result.text;
    res.status(200).json({ response: text });

    return text;
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export default handler;
