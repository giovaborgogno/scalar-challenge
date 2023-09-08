const express = require("express");
const app = express();
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");
const debugPrint = require("../utils/debugPrint");
const { insertMessage} = require("../db/client");
const get_messages = require("../utils/get_messages");

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let roomUsers = {};

io.on("connection", async (socket) => {
  const messages = await get_messages();
  io.emit("set_messages", { socketId: socket.id, messages})
  io.emit("users_response", roomUsers);
  debugPrint(`User Connected: ${socket.id}`);

  socket.on("join_room", (roomId, userId) => {
    socket.join(roomId);
    roomUsers = {
      ...roomUsers,
      [roomId]: [...(roomUsers[roomId] ?? []), userId],
    };
    io.emit("users_response", roomUsers);
    debugPrint(`User with ID: ${socket.id} joined room: ${roomId}`);
  });

  socket.on("send_message", async (data) => {
    insertMessage(data, data.roomId)
    io.emit("receive_message", data);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing_response", data);
  });

  socket.on("disconnect", () => {
    debugPrint("User Disconnected", socket.id);
    for (const [roomId, users] of Object.entries(roomUsers)) {
      if (users.includes(socket.id)) {
        roomUsers[roomId] = [...users.filter((id) => id !== socket.id)];
        const newMessage = {
          text: "A user left the room.",
          socketId: "kurakani",
          roomId: roomId,
        }
        insertMessage(newMessage, newMessage.roomId)
        io.emit("receive_message", newMessage );
      }
    }
    io.emit("users_response", roomUsers);
  });
});

module.exports = { app, server };
