import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post("/send-email", async (req, res) => {

  const { name, email } = req.body;

  try {

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Login Success",
      html: `
        <h1>Welcome ${name}</h1>
        <p>Your login successful 🚀</p>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Email Sent Successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Email Failed",
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON ${PORT}`);
});