/**
 * Author: Gurwinder Singh
 * Note:  In this task i am using nodejs 10. 
 *  Due to  some OS problem i am not 
 *  able to install nodejs 13. thats why i am not using ES6 Syntax
 *
 */

const http = require("http");
const express = require("express")
require('./config/mongo.js');
const cors = require("cors");
const app = express(); //Create express instance
const server = http.createServer(app);
app.use(cors());
const socket  = require('socket.io')(server, {
  cors: {
    origin: '*', //Alow Socket connection from other origins
  }
});
const WebSockets = require("./utils/WebSockets");
const chatRouter = require('./routes/chatRouter.js');

const port = 3000;

app.set("port", port);

app.use("/", chatRouter); //Add Chat Router

//Handle 404 request and return json 404 response
app.use("*", (req, res) => {
  return res.status(404).json({
    success: false,
    message : 'Api does not exist'
  });
})


server.listen(port);
socket.on('connection', (client) => {
  WebSockets.connection(client, socket);
});
server.on("listening", () =>{
  console.log("Listing on port", port);
});