import express from "express";
import cors from "cors";
import * as http from "http";
import { Server } from "socket.io";

const app = express();
const PORT = 8080;

// Enable CORS
app.use(cors({ origin: "*" }));

// Create HTTP server
const server = http.createServer(app);

// Create Socket.IO server
const io = new Server(server, {cors: {origin: "*", methods: ["GET", "POST"]}});

// Socket.IO connection event
io.on("connection", (socket) => {
  console.log(`[connection] connected with user: ${socket.id}`);

//  io.to(socket.id).emit(console.log("connected in room"));

  socket.on("message", (msg) => {
    console.log('message: ' + msg);
    socket.emit('message', 'Server received: ' + msg);
  });

  socket.on("disconnect", () => {
    console.log(`user disconnected: ${socket.id}`);
  });
});

// Simple test endpoint
app.get("/test", (req, res) => {
  res.send(JSON.stringify({ ok: true }));
});

// Listen on the defined PORT
server.listen(PORT, () => {
  console.log(`Server's up and running on port ${PORT} `);
});
