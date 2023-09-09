const express = require("express");
const ChatRoom = require("../models/ChatRoom");
const mongoose = require("mongoose");
const router = express.Router();

router.post("/create", (req, res, next) => {
  const { participants, name, type } = req.body;
  const chat = new ChatRoom({ name, type, participants });
  chat
    .save()
    .then(() => res.send("Chat created"))
    .catch((error) => res.send(error));
});

router.post("/ping", async (req, res, next) => {
  const { author, chatroomId, message } = req.body;
  const room = await ChatRoom.findById(chatroomId);
  console.log("ROOM", room);
  console.log(room.pings);
  room.pings.push({ author, message });
  room
    .save()
    .then(() => res.send("Sent"))
    .catch((error) => res.send(error));
});

module.exports = router;
