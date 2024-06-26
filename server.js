import Express from "express";
import cors from "cors";
import * as http from "http";
import { Server } from "socket.io";
import { YSocketIO } from "y-socket.io/dist/server";
import * as Y from "yjs";

const app = Express();
const PORT = 5000;

// Map to store yjs docs by room name
const docs = new Map();

app.use(cors({ origin: "*" }));

const server = http.createServer(app);

const io = new Server(server);
const ysocketio = new YSocketIO(io, {});
ysocketio.initialize();

io.on("connection", (socket) => {
  console.log(`[connection] connected with user: ${socket.id}`);

  socket.on('joinRoom', (room) => {
    if(!docs.has(room)){
      const ydoc = new Y.Doc();
      docs.set(room, ydoc);
    }
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  socket.on("message", (room, message) => {
    io.to(room).emit(message);
  })

  socket.on("leaveRoom", (room) => {
    socket.leave(room);
    console.log(`User left the room: ${room}`);
  })

  socket.on("disconnect", () => {
    console.log(`[disconnected] disconnected with user: ${socket.id}`);
  });
});



app.get("/test", (req, res) => {
  res.send(JSON.stringify({ ok: true }));
});

app.listen(PORT, () => {
  console.log(`Server's up and running on port ${PORT} `);
});
