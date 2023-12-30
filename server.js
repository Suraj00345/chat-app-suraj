const express = require("express");
const http = require("http"); //we don't need to do 'npm i http'
// express is a function
// which gives me a server when it invocked
const socketIo = require("socket.io");
// here i am just taking serverclass from socketIo object
const ServerClass = socketIo.Server;

const expressServer = express();

//i'm modifying my expressServer to httpServer
const httpServer = http.createServer(expressServer);

// it is taking http server and convertinh it into socketIoCompatibleServer
const io = new ServerClass(httpServer);

//.on is equivalent to .addEventListener
io.on("connection", (socket) => {
  // so the IO is unique and it's associted with my server
  // everytime some hits connection event it serves a uniques socket
  socket.on("secret message", (data) => {
    io.emit("io secret message", data);
  });
});
// it handel the frontend files
// it is a inbuilt function
expressServer.use(express.static("public"));
// cannot get -> no response from my server
// server.get method takes 2 things
//1.sub route
//2. is function which should request
// server.get("/", function handelGetRequest(request, response) {
//   response.send("welcome to my server");
// });

//on which port my server should be active

httpServer.listen(8888);
