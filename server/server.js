import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Basic API test route
app.get("/api/status", (req, res) => {
  res.json({ message: "Nova Remote server online 🚀" });
});

// WebSocket setup
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("🔗 Client connected:", socket.id);
  socket.on("voiceCommand", (cmd) => console.log("🎙️ Voice command:", cmd));
  socket.on("disconnect", () => console.log("❌ Client disconnected"));
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

export default app;
