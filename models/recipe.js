const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    name: {type: String, required: true, unique: true},
    ingredients: [
        {
            amount: Number,
            fraction: {type: String, default: ""},
            measurement: {type: String, default: "oz"},
            ingredient:{type: Schema.Types.ObjectId, ref: 'Ingredient', required: true}
        }
    ]
}, { timestamps: true }
);

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;