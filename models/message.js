const mongoose = require("mongoose");
const connection = require("../config/db_connection");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  content: { type: String, required: true, maxLength: 2000 },
  anon_user: { type: Schema.Types.ObjectId, ref: "AnonUser", required: true },
  createdAt: { type: Date, default: Date.now() },
});

const Message = connection.model("Message", messageSchema);

module.exports = Message;
