const mongoose = require("mongoose");
const plm = require("passport-local-mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/yummy!");

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  pp: String,
  recipes: [{type: mongoose.Schema.Types.ObjectId, ref: "recipes"}],
  comments: [{type: mongoose.Schema.Types.ObjectId, ref: "comments"}]
});

userSchema.plugin(plm);

module.exports = mongoose.model('user',userSchema)