const mongoose = require("mongoose");
const connection = require("../config/db_connection");
const Schema = mongoose.Schema;

const anonSchema = new Schema({
  username: { type: String, required: true, minLength: 3, maxLength: 16 },
  hash: { type: String, required: true },
  salt: { type: String, required: true },
  isMember: { type: Boolean, default: false },
  isModerator: { type: Boolean, default: false },
});

const AnonUser = connection.model("AnonUser", anonSchema);

module.exports = AnonUser;
