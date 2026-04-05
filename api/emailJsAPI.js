import emailjs from "@emailjs/nodejs";

const handle = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { user_name, user_email, message } = req.body;

  if (!user_name || !user_email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;
  const serviceID = process.env.EMAILJS_SERVICE_ID;
  const templateID = process.env.EMAILJS_TEMPLATE_ID;

  console.log({ publicKey, privateKey, serviceID, templateID });

  if (!publicKey || !privateKey || !serviceID || !templateID) {
    return res.status(500).json({ error: "Missing EmailJS configuration" });
  }

  try {
    await emailjs.send(
      serviceID,
      templateID,
      {
        from_name: user_name,
        from_email: user_email,
        message,
      },
      { publicKey: publicKey, privateKey: privateKey },
    );

    return res
      .status(200)
      .json({ success: true, message: "Email sent successfully" });
  } catch (err) {
    console.error("Error sending email:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

export default handle;

// import emailjs from "@emailjs/nodejs";

// const handle = async (req, res) => {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   const { user_name, user_email, message } = req.body;

//   if (!user_name || !user_email || !message) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   try {
//     const response = await fetch(
//       "https://api.emailjs.com/api/v1.0/email/send",
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           service_id: process.env.EMAILJS_SERVICE_ID,
//           template_id: process.env.EMAILJS_TEMPLATE_ID,
//           user_id: process.env.EMAILJS_PUBLIC_KEY, // public key
//           accessToken: process.env.EMAILJS_PRIVATE_KEY, // private key
//           template_params: {
//             from_name: user_name,
//             from_email: user_email,
//             message: message,
//           },
//         }),
//       },
//     );

//     if (!response.ok) {
//       const errText = await response.text();
//       console.error("EmailJS error:", errText);
//       return res.status(500).json({ success: false, error: errText });
//     }

//     return res.status(200).json({ success: true });
//   } catch (err) {
//     console.error("Error sending email:", err);
//     return res.status(500).json({ success: false, error: err.message });
//   }
// };

// export default handle;
