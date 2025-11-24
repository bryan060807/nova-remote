// server/server.js — Nova Remote Backend
// Production-ready Express server with environment validation and WebSocket support

import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import config from "./config.js";

const app = express();
const server = http.createServer(app);

// ────────────────
//  CORS Configuration
// ────────────────
app.use(
  cors({
    origin: config.corsOrigin,
    methods: ["GET", "POST", "OPTIONS"],
  })
);

app.use(express.json());

// ────────────────
//  WebSocket Setup
// ────────────────
const io = new Server(server, {
  cors: {
    origin: config.corsOrigin,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`🔗 WebSocket connected: ${socket.id}`);

  socket.on("sendCommand", (command) => {
    console.log("📺 TV Command received:", command);
    io.emit("commandResponse", { success: true, command });
  });

  socket.on("disconnect", () => {
    console.log(`❌ WebSocket disconnected: ${socket.id}`);
  });
});

// ────────────────
//  API Routes
// ────────────────
app.get("/", (req, res) => {
  res.send("✅ Nova Remote Server is running!");
});

app.get("/api/pair", (req, res) => {
  console.log(`🔌 Pairing request for TV at ${config.tvIp}`);
  res.json({ success: true, ip: config.tvIp });
});

app.post("/api/send-command", (req, res) => {
  const { action } = req.body;
  console.log(`🎮 Received command: ${action}`);
  res.json({ success: true, action });
});

// ────────────────
//  Start Server
// ────────────────
server.listen(config.port, () => {
  console.log(`🚀 Nova Remote backend running on port ${config.port}`);
});

export default app;
