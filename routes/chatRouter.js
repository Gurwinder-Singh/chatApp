const express = require('express');
const ChatController = require('../controller/chatController');

const router = express.Router(); //Get router instance from express

router.get("/groups", ChatController.onGetAllGroups);//Get All groups name
router.get("/group/:name", ChatController.onGetGroupChat); //Get All chat for specific group name
router.get("/user/:sender/:reciever", ChatController.onUserChat); //Get All Chat for one to one user


module.exports = router; //Export this router so we can use it in our index file