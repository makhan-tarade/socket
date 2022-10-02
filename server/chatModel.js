const mongoose = require("mongoose");

const ChatSchema = mongoose.Schema({
  room_id: { type: String },
  members: [{ user1: { type: String } }, { user2: { type: String } }],
  messages: {
    sender: { type: String },
    messages: { type: String },
  },
});

const ChatModel = mongoose.model("chat", ChatSchema);
module.exports = { ChatModel: ChatModel };
