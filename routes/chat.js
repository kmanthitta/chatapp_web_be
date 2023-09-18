const express = require("express");
const ChatRoom = require("../models/ChatRoom");
const mongoose = require("mongoose");
const router = express.Router();
const { Types } = require("mongoose");
var ObjectId = Types.ObjectId;

router.post("/ping", async (req, res, next) => {
  const io = require("../socket").getIO();
  const { author, chatroomId, message } = req.body;
  const room = await ChatRoom.findById(new ObjectId(chatroomId));
  room.pings.push({ author, message });
  room.latestPing = { author, message };
  let userFound = false;
  room.read.forEach((user) => {
    if (user.participantId === author) {
      user.readNotificationCount = room.pings.length;
      userFound = true;
    }
  });
  if (!userFound) {
    room.read.push({
      participantId: author,
      readNotificationCount: room.pings.length,
    });
  }
  room
    .save()
    .then((resp) => {
      io.emit("ping", {
        chatId: resp._id,
        ping: resp.pings[resp.pings.length - 1],
      });
      res.send("Sent");
    })
    .catch((error) => res.send(error));
});

router.post("/read", async (req, res, next) => {
  const { userId, chatroomId, count } = req.query;
  const room = await ChatRoom.findById(new ObjectId(chatroomId));
  let userFound = false;
  room.read.forEach((user) => {
    if (user.participantId === userId) {
      user.readNotificationCount = count;
      userFound = true;
    }
  });
  if (!userFound) {
    room.read.push({
      participantId: userId,
      readNotificationCount: count,
    });
  }
  room
    .save()
    .then(() => res.send("Read"))
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

const createGroupChat = async (name, participants) => {
  const chat = new ChatRoom({
    name: name,
    type: "group",
    participants: participants,
  });
  const result = await chat.save();
  return result;
};

module.exports = { router, createDMChat, createGroupChat };
