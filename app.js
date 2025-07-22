const express = require("express");
const { stat } = require("fs");
const app = express();        
const http = require("http");
const path = require("path");

const socketio = require("socket.io");

const server = http.createServer(app);

const io = socketio(server);

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));

io.on("connection", function(socket){
    socket.on("send-location", function(data){
        io.emit("recieve-location", {id:socket.id, ...data})
    });
    console.log("Connected");
});

app.get("/", (req,res) => {
    res.render("index");
});

server.listen(3000 , (req,res) => {
    console.log("Listening at port 3000");
});