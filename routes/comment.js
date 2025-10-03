const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    text: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: "user"},
    recipe: {type: mongoose.Schema.Types.ObjectId, ref: "recipes"}
});

module.exports = mongoose.model('comments',commentSchema);