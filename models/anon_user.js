const mongoose = require("mongoose");
const connection = require("../config/db_connection");
const Schema = mongoose.Schema;

const anonSchema = new Schema({
  username: { type: String, required: true, minLength: 3 },
  hash: { type: String, required: true },
  salt: { type: String, required: true },
});

const Anon = connection.model("AnonUsers", anonSchema);

module.exports = Anon;
