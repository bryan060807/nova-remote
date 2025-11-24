// server/server.js — Nova Remote Backend
// Production-ready Express server with WebSocket for TV commands

import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const server = http.createServer(app);

// Allow CORS from Vercel and localhost
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

// Initialize WebSocket
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Basic WebSocket logic
io.on("connection", (socket) => {
  console.log(`🔗 WebSocket connected: ${socket.id}`);

  socket.on("sendCommand", (command) => {
    console.log("📺 TV Command received:", command);
    // Here’s where you’d connect to the LG TV WebSocket API
    io.emit("commandResponse", { success: true, command });
  });

  socket.on("disconnect", () => {
    console.log(`❌ WebSocket disconnected: ${socket.id}`);
  });
});

// Basic health check route
app.get("/", (req, res) => {
  res.send("✅ Nova Remote Server is running!");
});

// Start the server (Vercel ignores .listen(), but locally it’s needed)
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Export default for Vercel serverless function compatibility
export default app;
