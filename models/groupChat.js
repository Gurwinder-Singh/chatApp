const mongoose = require("mongoose");

const groupChatSchema = new mongoose.Schema(
  {
    name:  {
      type: String,
      required: true
     }, //Group Name
    sender:  {
      type: String,
      required: true
     }, //Message Sender
    message: String, // Message Body
  },
  {
    timestamps: true, //This will add createdAt and updatedAt into mongodb
    collection: "groupChat", //Collection name on db
  }
);

module.exports = mongoose.model("GroupChat", groupChatSchema);
