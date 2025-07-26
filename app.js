// if(process.env.NODE_ENV != "production"){
//     require('dotenv').config();
// }

const express =  require("express");
const app = express();
const port = 3000;
const path = require("path");
const http = require("http");
const bodyParser = require("body-parser");

const socketio = require("socket.io");

const server = http.createServer(app);
const io = socketio(server);

io.on("connection", function(socket){
    socket.on("send-location", function(data){
        io.emit("receive-location",{id:socket.id, ...data});
    })
    socket.on("disconnected", function(){
        io.emit("user-disconnected", socket.id);
    })
})

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "views"))
app.use(express.static(path.join(__dirname , "public")));
app.use(bodyParser.json());
app.use(express.json());


app.get("/map",(req,res)=>{
    res.render("index.ejs")
})


server.listen(port , ()=>{
    console.log(`server is running on port ${port}`);
})