import express from "express";
import cors from "cors";
import * as http from "http";
import { Server } from "socket.io";
import * as Y from "yjs";

const app = express();
const PORT = 8080;

// Enable CORS
app.use(cors({ origin: "*" }));

// Create a central Yjs doc
// const doc = new Y.Doc();

// Create HTTP server
const server = http.createServer(app);

// Create Socket.IO server
const io = new Server(server, {cors: {origin: "*", methods: ["GET", "POST"]}});

// Socket.IO connection event
io.on("connection", (socket) => {
  console.log(`[connection] connected with user: ${socket.id}`);

//  io.to(socket.id).emit(console.log("connected in room"));

  socket.on("joinRoom", (room_id) => {
    socket.join(room_id);
    console.log(`User ${socket.id} joined room ${room_id}`);
  })

  socket.on("message", (msg) => {
    console.log('message: ' + msg);
    socket.emit('message', 'Server received: ' + msg);
  });

  socket.on("new-block-added", (data) => {
    const {room_id, update} = data;
    socket.to(room_id).emit("new-block-added", update);
    console.log(`user ${socket.id} sent the changes in room ${room_id}`);
  })

  socket.on("new-block-deleted", (data) => {
  const {room_id, update} = data;
  socket.to(room_id).emit("new-block-deleted", update);
  console.log(`user ${socket.id} deleted the block in room ${room_id}`);
  })

  socket.on("block-moved/connected/disconnected", (data) => {
  const {room_id, update} = data;
  socket.to(room_id).emit("block-moved/connected/disconnected", update);
  console.log(`user ${socket.id} changed the block in room ${room_id}`);
  })

  socket.on("block-value-updated", (data) => {
  const {room_id, update} = data;
  socket.to(room_id).emit("block-value-updated", update);
  console.log(`user ${socket.id} changed the value of a block in room ${room_id}`);
  })

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
