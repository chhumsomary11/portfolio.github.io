import OpenAI from "openai";

const knowledge = `
This website is a portfolio of Chhumsomary, an ICT and English teaching student.
She has experience in AI, web development, and cloud computing.
Projects include:
- AI posture detection (won national competition and responsible for UX/UI design)
- Frontend development for a local e-commerce website (Platypus)
- A personal portfolio website (this one) built with React and Tailwind CSS, featuring a chatbot powered by ling3.0 AI.
- Movie application built with React and Tailwind CSS, fetching data from The Movie Database (TMDb) API, allowing users to search for movies, view details, and manage a watchlist.
- to do List 
-Basic Performing CRUD operations for employee management, built with React and Node.js. To be updated soon with more features and frontend design.,

Skills:
- JavaScript, Python, React, Node.js, Framer, figma
- Machine Learning and Computer Vision

Contact:
- Email: dananloeung@gmail.com
- Social media links on the website.
- Or users can contact through the contact form. Send me an email, so I won't be bored. And notify that you will try your best to answer as soon as possible.

This website is built with React and Tailwind CSS, hosted on Vercel. It features a chatbot powered by Google Gemini AI to answer questions about me and my work.
And I haven't fully updated the website yet.`;

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

  try {
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "inclusionai/ling-3.0-flash:free",
      messages: [
        {
          role: "system",
          content: `You are an AI assistant for Mary, and your name is Miku. 
          Do not answer too long, and keep your answers concise. Be a bit sacarstic and humorous, but not too much.
          Be a bit introvert because the owner is an introvert.
          
          Information:
          ${knowledge}`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const text = completion.choices[0].message.content;

    res.status(200).json({ response: text });
    return text;
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export default handler;
