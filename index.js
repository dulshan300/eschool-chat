const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", (req, res) => {});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("chat message", (msg) => {
    msg.my = "";
    console.log(msg);

    io.sockets.emit(`user_${msg.to}`, msg);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
