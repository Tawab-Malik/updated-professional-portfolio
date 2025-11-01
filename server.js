import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = 5000;

// ✅ Allow requests from your frontend
app.use(
  cors({
    origin: process.env.VITE_API_URL, // ✅ FIXED
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, project } = req.body; // ✅ change here

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER || "",
        pass: process.env.GMAIL_PASS || "",
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.GMAIL_USER || "",
      subject: `Message from ${name}`,
      text: project, // ✅ use project here
    });

    res.status(200).json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Failed to send message" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
