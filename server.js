///////////////////////////////
// DEPENDENCIES
////////////////////////////////
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;
const Ingredient = require('./models/ingredient');


///////////////////////////////
// CORS
////////////////////////////////
const whitelist = ['http://localhost:3000', 'https://new-cocktail-react.herokuapp.com'];

const corsOptions = {
    origin: (origin, callback) => {
        if(whitelist.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true
}


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


///////////////////////////////
// MIDDLEWARE
////////////////////////////////
app.use(express.static('public'));
app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan('dev'))


///////////////////////////////
// ROUTES & CONTROLLERS
////////////////////////////////
// test route
app.get('/', (req,res) => {
    res.send("hello, cocktails");
});

const ingredientsController = require('./controllers/ingredients');
app.use('/ingredients', ingredientsController)

const recipesController = require('./controllers/recipes');
app.use('/recipes', recipesController)

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));