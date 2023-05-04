const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const server = http.createServer(app);
const { Server } = require("socket.io");
const { SOCKET_ACTIONS } = require("./SocketActions");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const PORT = 5000;

app.use(cors);

io.on("connection", (socket) => {
  console.log(`${socket.id} user connected`);

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  socket.on(SOCKET_ACTIONS.joinRoom, (roomId) => {
    socket.join(roomId);
    io.to(roomId).emit(SOCKET_ACTIONS.chat, {
      id: "room-bot-1000",
      roomId,
      author: "ChatBot",
      message: "A new user has joined!",
    });
  });

  socket.on(SOCKET_ACTIONS.leaveRoom, (roomId) => {
    socket.leave(roomId);
    io.to(roomId).emit(SOCKET_ACTIONS.chat, {
      id: "room-bot-1000",
      roomId,
      author: "ChatBot",
      message: "A user has left.",
    });
  });

  socket.on(SOCKET_ACTIONS.chat, (data) => {
    io.to(data.roomId).emit(SOCKET_ACTIONS.chat, data);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
