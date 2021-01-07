const mongoose = require("mongoose");

const userChatSchema = new mongoose.Schema(
  {
    sender: {
     type: String,
     required: true
    }, //Sender, who send this message
    reciever:  {
      type: String,
      required: true
    }, //Message reciever
    message: String, // Message Body
  },
  {
    timestamps: true, //This will add createdAt and updatedAt into mongodb
    collection: "userChat", //Collection name on db
  }
);

module.exports = mongoose.model("UserChat", userChatSchema);
