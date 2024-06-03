const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Socket.io
io.on("connection", (socket) => {
  socket.on("user-message", (message) => {
    socket.broadcast.emit("message", message);
  });
});

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  return res.sendFile(__dirname + "/public/index.html");
});

app.get("/room", (req, res) => {
  return res.sendFile(__dirname + "/public/room.html");
});

server.listen(9000, () => console.log("Server started at port:9000"));
