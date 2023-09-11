const express = require("express");
const ChatRoom = require("../models/ChatRoom");
const mongoose = require("mongoose");
const router = express.Router();
const { Types } = require("mongoose");
var ObjectId = Types.ObjectId;

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
  const room = await ChatRoom.findById(new ObjectId(chatroomId));
  room.pings.push({ author, message });
  room.latestPing = { author, message };
  room
    .save()
    .then(() => res.send("Sent"))
    .catch((error) => res.send(error));
});

const createDMChat = async (user1, user2) => {
  const chat = new ChatRoom({
    name: "",
    type: "dm",
    participants: [user1, user2],
  });
  const result = await chat.save();
  return result;
};

module.exports = { router, createDMChat };
