// /client/src/App.jsx
import React, { useEffect, useState } from "react";
import socket from "./utils/socket.js";

function App() {
  const [status, setStatus] = useState("Connecting...");
  const [lastCommand, setLastCommand] = useState("");

  useEffect(() => {
    socket.on("connect", () => setStatus("Connected ✅"));
    socket.on("disconnect", () => setStatus("Disconnected ❌"));

    // Example listener for server updates
    socket.on("tvStatus", (data) => {
      console.log("📺 TV Status:", data);
      setLastCommand(`TV Status: ${JSON.stringify(data)}`);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("tvStatus");
    };
  }, []);

  const sendCommand = (cmd) => {
    socket.emit("voiceCommand", cmd);
    setLastCommand(`Sent command: ${cmd}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-2">Nova Remote</h1>
      <p className="text-green-400 mb-4">{status}</p>

      <div className="flex gap-4">
        <button
          onClick={() => sendCommand("volume_up")}
          className="bg-blue-500 px-4 py-2 rounded-xl hover:bg-blue-600"
        >
          Volume Up
        </button>
        <button
          onClick={() => sendCommand("volume_down")}
          className="bg-blue-500 px-4 py-2 rounded-xl hover:bg-blue-600"
        >
          Volume Down
        </button>
        <button
          onClick={() => sendCommand("power_toggle")}
          className="bg-red-500 px-4 py-2 rounded-xl hover:bg-red-600"
        >
          Power
        </button>
      </div>

      <p className="mt-4 text-sm text-gray-300">{lastCommand}</p>
    </div>
  );
}

export default App;
