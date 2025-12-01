const mongoose = require('mongoose');
mongoose.set('strictPopulate', false);

const recipeSchema = mongoose.Schema({
    name: String,
    ingredients: String,
    instructions: String,
    image: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: "user"},
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: "comments"}]
});

module.exports = mongoose.model('recipes',recipeSchema);