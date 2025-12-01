const mongoose = require("mongoose");
mongoose.set('strictPopulate', false);

const commentSchema = mongoose.Schema({
    text: String,
    user: String,
    recipe: {type: mongoose.Schema.Types.ObjectId, ref: "recipes"}
});

module.exports = mongoose.model('comments',commentSchema);