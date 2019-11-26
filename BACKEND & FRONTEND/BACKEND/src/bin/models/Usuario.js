const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  lastname: String,
  nickname: String,
  password: String
});

var User = mongoose.model("Usuario", userSchema);
module.exports = User;
