import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://nova-remote.vercel.app"
    ],
    methods: ["GET", "POST"],
  })
);

app.use(express.json());

app.get("/api/pair", (req, res) => {
  res.json({ success: true, ip: process.env.TV_IP || "192.168.12.81" });
});

app.post("/api/send-command", (req, res) => {
  const { action } = req.body;
  console.log(`🎮 Received command: ${action}`);
  res.json({ success: true, action });
});

export default app;
