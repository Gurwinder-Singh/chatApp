const groupChat = require("../models/groupChat");
const userChat = require("../models/userChat");

module.exports = {
  onGetAllGroups: async (req, res) => {
    //Get All Groups name
    const names = await groupChat.find().distinct("name"); // Return unique group names
    return res.status(200).json({ success: true, names });
  },

  onGetGroupChat: async (req, res) => {
    try {
      //find records for specific group
      const chats = await groupChat.find({ name: req.params.name });
      return res.status(200).json({ success: true, chats });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },

  onUserChat: async (req, res) => {
    try {
      //Find record where sender and reciever match
      const chats = await userChat.find({
        sender: req.params.sender,
        reciever: req.params.reciever,
      });
      return res.status(200).json({ success: true, chats });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },

  onSaveGroupChat: async (name, sender, message) => {
    const chat = await groupChat.create({ name, sender, message }); // Save Group chat into mongodb
    return chat;
  },

  onSaveUserChat: async (sender, reciever, message) => {
    //Save User chat into mongodb (This is another way to save record using module object)
    let saveMessage = new userChat({
      sender: sender,
      reciever: reciever,
      message: message,
    });
    const chat = await saveMessage.save();
    return chat;
  },
};
