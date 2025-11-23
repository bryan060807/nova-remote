// socket.js
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_API_BASE_URL || "http://localhost:5000", {
  transports: ["websocket"],
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

socket.on("connect", () => console.log("🟢 Connected:", socket.id));
socket.on("disconnect", () => console.log("🔴 Disconnected"));
socket.on("connect_error", (err) => console.error("⚠️ Socket error:", err.message));

export default socket;
