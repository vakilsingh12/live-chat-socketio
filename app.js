require("dotenv").config();
const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io=new Server(server)
io.on("connection",(socket)=>{
  socket.on('user-message',(message)=>{
    io.emit('message',message)
    console.log(message)
  })
  // console.log("A new user has connnected",socket.id)
})
app.use(express.static(path.resolve("./public")));
const PORT = 7000 || process.env.PORT;
app.get("/", (req, res) => {
  return res.sendFile("/public/index.html");
});
server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
