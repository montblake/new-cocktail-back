///////////////////////////////
// DEPENDENCIES
////////////////////////////////
require('dotenv').config();
const mongoose = require('mongoose');
// const MONGODB_URL = process.env.MONGODB_URL;
const MONGODB_URL = "mongodb+srv://admin:abc1234@cluster0.k9klx.mongodb.net/new-cocktails?retryWrites=true&w=majority"
const Ingredient = require('./models/ingredient');

///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////
// Establish Connection
mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

// Event Listeners
const db = mongoose.connection

db.on("open", () => console.log("You are connected to MongoDB"))
db.on("close", () => console.log("You have been disconnected from MongoDB"))
db.on("error", (error) => console.log(error));


const ingredientArray = [
    {
        "name": "Gin",
        "category": "Spirit"
    },
    {
        "name": "Vodka",
        "category": "Spirit"
    },
    {
        "name": "Bourbon",
        "category": "Spirit"
    },
    {
        "name": "Rye",
        "category": "Spirit"
    },
    {
        "name": "Mezcal",
        "category": "Spirit"
    },
    {
        "name": "Tequila",
        "category": "Spirit"
    },
    {
        "name": "Rum",
        "category": "Spirit"
    },
    {
        "name": "Simple Syrup",
        "category": "Sweetener"
    },
    {
        "name": "Angostura Bitters",
        "category": "Bitters"
    },
    {
        "name": "Sweet Vermouth",
        "category": "Aromatised Wine"
    },
    {
        "name": "Dry Vermouth",
        "category": "Aromatised Wine"
    }

]


Ingredient.deleteMany({}, (err, ingredients)=> {
    if (err){
        console.log(err);
    } else {
        Ingredient.create(ingredientArray, (err, createdIngredients)=> {
            if(err){
                console.log(err);
            } else {
                console.log(createdIngredients);
            }
        });
    }
});
    