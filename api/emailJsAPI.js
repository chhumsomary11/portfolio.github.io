import emailjs from "@emailjs/nodejs";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 100;
const MAX_MESSAGE = 3000;

const handle = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { user_name, user_email, message } = req.body ?? {};

  if (!user_name || !user_email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (
    typeof user_name !== "string" ||
    typeof user_email !== "string" ||
    typeof message !== "string"
  ) {
    return res.status(400).json({ error: "Invalid input" });
  }

  if (!EMAIL_PATTERN.test(user_email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  if (user_name.length > MAX_NAME || message.length > MAX_MESSAGE) {
    return res.status(400).json({ error: "Input is too long" });
  }

  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;
  const serviceID = process.env.EMAILJS_SERVICE_ID;
  const templateID = process.env.EMAILJS_TEMPLATE_ID;

  if (!publicKey || !privateKey || !serviceID || !templateID) {
    console.error("Missing EmailJS configuration");
    return res.status(500).json({ error: "Server configuration error" });
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
      { publicKey, privateKey },
    );

    return res
      .status(200)
      .json({ success: true, message: "Email sent successfully" });
  } catch (err) {
    console.error("Error sending email:", err);
    return res
      .status(500)
      .json({ success: false, error: "Failed to send email" });
  }
};

export default handle;
