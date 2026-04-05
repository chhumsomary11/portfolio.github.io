import emailjs from "@emailjs/nodejs";

const handle = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { user_name, user_email, message } = req.body;

  if (!user_name || !user_email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;
    const privateKey = process.env.EMAILJS_PRIVATE_KEY;
    const serviceID = process.env.EMAILJS_SERVICE_ID;
    const templateID = process.env.EMAILJS_TEMPLATE_ID;

    if (!publicKey || !privateKey || !serviceID || !templateID) {
      return res.status(500).json({ error: "Missing EmailJS configuration" });
    }

    emailjs.init({
      publicKey: publicKey,
      privateKey: privateKey,
    });

    const templateParams = {
      from_name: user_name,
      from_email: user_email,
      message: message,
    };

    await emailjs.send(serviceID, templateID, templateParams);

    return res
      .status(200)
      .json({ success: true, message: "Email sent successfully" });
  } catch (err) {
    console.error("Error sending email:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

export default handle;
