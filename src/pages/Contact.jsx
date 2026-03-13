import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
// import { send } from "vite";

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState(""); // To hold success/error status
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    //Avoid double clicking
    if (sending) return;

    //when user press submit, the sending will be truth
    setSending(true);

    emailjs
      .sendForm("service_0zunuqi", "template_q9c4q0s", form.current, {
        publicKey: "7P8K9NxrQuhvLShb4",
      })
      .then(
        () => {
          setStatus("Message sent successfully!");
          console.log("SUCCESS!");
          form.current.reset();
          setTimeout(() => {
            setStatus(""); // Clear status after 3 seconds
          }, 3000);
        },
        (error) => {
          setStatus(`Failed to send message: ${error.text}`);
          console.log("FAILED...", error.text);
        },
      )
      .finally(() => {
        setSending(false);
      });
  };

  return (
    <div className="min-h-screen px-6 pt-24">
      <form
        ref={form}
        className="flex flex-col justify-center items-center"
        onSubmit={handleSubmit}
      >
        <input
          className="mb-4 p-2 border border-gray-300 rounded"
          type="text"
          placeholder="Name"
          name="user_name"
        />
        <input
          className="mb-4 p-2 border border-gray-300 rounded"
          type="email"
          placeholder="Email"
          name="user_email"
        />
        <textarea
          className="mb-4 p-2 border border-gray-300 rounded"
          placeholder="Message"
          name="message"
        ></textarea>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          type="submit"
          disabled={sending}
        >
          {sending ? "Sending...." : "Send"}
        </button>
      </form>
      {status && (
        <div
          className={`mt-4 text-center ${status.includes("success") ? "text-green-500" : "text-red-500"}`}
        >
          {status}
        </div>
      )}
    </div>
  );
};

export default Contact;
