import express from "express";
import multer from "multer";
import transporter from "../config/nodemailerConfig.js";

const router = express.Router();

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route for emailing resume
router.post("/emailResume", upload.single("resume"), async (req, res) => {
  const { email } = req.body;
  const resume = req.file;

  if (!email || !resume) {
    return res.status(400).send("Email and resume are required.");
  }

  try {
    const mailOptions = {
      from: email,
      to: process.env.MAIL_USER,
      subject: "New Vocation Inquiry Received",
      text: "A new inquiry has been submitted through the vocation form.",
      attachments: [
        {
          filename: resume.originalname,
          content: resume.buffer,
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent successfully.");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send email.");
  }
});

export default router;
