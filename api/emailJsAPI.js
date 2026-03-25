// import emailjs from "@emailjs/nodejs";

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   const { name, email, message } = req.body;

//   if (!name || !email || !message) {
//     return res
//       .status(400)
//       .json({ error: "Name, email, and message are required" });
//   }

//   try {
//     const serviceID = process.env.EMAILJS_SERVICE_ID;
//     const templateID = process.env.EMAILJS_TEMPLATE_ID;
//     const publicKey = process.env.EMAILJS_PUBLIC_KEY;
//     const privateKey = process.env.EMAILJS_PRIVATE_KEY;

//     if (!serviceID || !templateID || !publicKey || !privateKey) {
//       return res.status(500).json({ error: "Missing EmailJS configuration" });
//     }

//     // Initialize EmailJS with Node.js credentials
//     emailjs.init({
//       publicKey: publicKey,
//       privateKey: privateKey,
//     });

//     const templateParams = {
//       from_name: name,
//       from_email: email,
//       message: message,
//     };

//     await emailjs.send(serviceID, templateID, templateParams);

//     return res.status(200).json({ message: "Email sent successfully" });
//   } catch (error) {
//     console.error("Error sending email:", error);
//     return res
//       .status(500)
//       .json({ error: "Failed to send email", details: error.message });
//   }
// }
