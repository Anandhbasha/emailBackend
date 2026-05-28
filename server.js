import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server Running Successfully");
});

app.post("/send-email", async (req, res) => {

  try {

    const { name, email } = req.body;

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
        <p>Email Trigger Successful 🚀</p>
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
      message: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON ${PORT}`);
});