// const express = require("express");
// const mongoose = require("mongoose");
// const { Server } = require("socket.io");



// const app = express();

// const io = new Server(app, {
//     cors: {
//         origin: "http://localhost:4000",
//         methods:["GET","POST"],
//     },
// })
 
// io.on("connection", (socket) => {
//     console.log(app.id)
    
// })




// mongoose.connect(
//   "mongodb+srv://login:login@cluster0.ul2bphn.mongodb.net/?retryWrites=true&w=majority"
// )
//     .then(() => console.log("mongoose connected"))
// .catch((err)=>console.log(err))


// app.listen(4000, () => {
//     console.log("server is runing on port 4000")
// })

const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const mongoose = require("mongoose");
app.use(cors());


const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ['GET', "POST"],
        
    },
});


 
 mongoose.connect(
   "mongodb+srv://login:login@cluster0.ul2bphn.mongodb.net/?retryWrites=true&w=majority"
 )
     .then(() => console.log("mongoose connected"))
 .catch((err)=>console.log(err))











io.on('connection', (socket) => {
    console.log(`User Connected:${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID:${socket.id} joined room:${data}`);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("recive_message", data);
        
    })


    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id)
    });
});


server.listen(4001, () => {
    console.log("server is running")
})