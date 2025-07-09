require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const leaderboardRoutes = require("./routes/leaderboard");
const { connectProducer } = require("./kafka/producer");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const PORT = process.env.PORT || 5000;

// ✅ Main startup
const startServer = async () => {
  await connectProducer(); // 🧠 Important: Wait for Kafka to be ready

  app.use(cors());
  app.use("/leaderboard", leaderboardRoutes);

  require("./controllers/gameController")(io); // 🎮 Load game logic after Kafka

  app.get("/", (req, res) => {
    res.send("Connect 4 API running");
  });

  // Health check endpoint for faster response
  app.get("/health", (req, res) => {
    res.status(200).json({ 
      status: "ok", 
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  });

  // Wake up endpoint
  app.get("/wake", (req, res) => {
    console.log("🚀 Wake up request received");
    res.status(200).json({ 
      message: "Server is awake", 
      timestamp: new Date().toISOString() 
    });
  });

  server.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
};

startServer(); // 🚀 Start the app
