const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
    name: String,
    ingredients: String,
    instructions: String,
    image: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: "user"},
    Comment: [{type: mongoose.Schema.Types.ObjectId, ref: "comments"}]
});

module.exports = mongoose.model('recipes',recipeSchema);