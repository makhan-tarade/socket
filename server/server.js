const express = require("express");
// const upload = multer({ dest: "uploads/" });
const app = express();
var http = require("http");
var server = http.createServer(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/chat", (req, res) => {});

const io = require("socket.io")(3000, {
  cors: {
    origin: ["http://localhost:8080"],
  },
});
// const Chat = require("./chatModel");
// connect db
// const mongoose = require("mongoose");

// mongoose.connect(
//   "mongodb+srv://makhantarade:Makhan123@cluster0.6xsc6.mongodb.net/makhan?retryWrites=true&w=majority",
//   {},
//   (err) => {
//     console.log("connected");
//   }
// );
io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("send-message", (message, room) => {
    if (room === "") {
      io.broadcast.emit("receive-message", message);
    } else {
      socket.to(room).emit("receive-message", message);
    }
  });
  // cb callback
  socket.on("join-room", (room, cb) => {
    socket.join(room);
    cb(`Joined ${room}`);
  });
});
