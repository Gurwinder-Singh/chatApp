const chatController = require('../controller/chatController');
class WebSocket{
  connection(client, io) {
    //Remove user from connected users map
    client.on("disconnect", () => {
      this.constructor.users = this.constructor.users.filter((user) => user.socketId !== client.id);
    });

    //Call from client Side when socket connected
    client.on("init", (username) => {
      this.constructor.users.push({
        socket: client,
        socketId : client.id,
        username: username,
      });
    });

    //Join new Group 
    client.on("join group", (name) => {
      client.join(name); //This will join room/group for this user
    })

    client.on("leave group", (name) => {
      client.leave(name); // Leave group
    })

    client.on("Group Message", (data) => {
      //Save message in group chat
      chatController.onSaveGroupChat(data.name, this.getCurrentUsername(client.id), data.message).then((msg) => {
        io.in(data.name).emit("message", msg); //Send message to all users in same group
      });
      
    });

    client.on("User Message", (data) => {
      //Save chat with user
      chatController.onSaveUserChat(this.getCurrentUsername(client.id), data.reciever, data.message).then((msg) => {
        const socketConn = this.getUser(data.reciever);
        if (socketConn) {
          //Send chat message to recevier user
          socketConn.socket.emit("message", msg);
        }
      });
     
    });

  }

  /**
   * Get Current login user name
   * @param {current logged in username} id 
   */
  getCurrentUsername(id){
    return this.constructor.users.filter((user) => user.socketId == id)[0].username; 
  }

  /**
   * Get User Object from username 
   * @param {username for search} username 
   */
   getUser(username){
    return this.constructor.users.filter((user) => user.username == username)[0];
  };
}
WebSocket.users = [];

module.exports = new WebSocket();