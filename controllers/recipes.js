const express = require('express');
const recipesRouter = express.Router();
const Recipe = require('../models/recipe');


// GET (index) list of recipes
recipesRouter.get('/', (req, res) => {
	Recipe.find({})
	.populate('ingredients.ingredient')
	.exec((error, foundRecipes) => {
		if(error) {
			res.status(400).json({ error: error.message })
		} else {
			res.status(200).json(foundRecipes)
		}
	});
});

// POST create a Recipe
recipesRouter.post('/', (req, res) => {
  Recipe.create(req.body, (error, newRecipe) => {
    if(error) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(200).json(newRecipe)
    }
  });
});

// DELETE a Recipe
recipesRouter.delete('/:id', (req, res) => {
    Recipe.findByIdAndDelete(req.params.id, (error, deletedRecipe) => {
    if(error) {
      res.status(400).json({ error: error.message })
    } else if (deletedRecipe === null) {
      res.status(404).json({ message: 'Recipe id not Found'})
    } else {
      res.status(200).json({ message: `Recipe ${deletedRecipe.name} deleted successfully`})
    }
  })
})

// UPDATE update Recipe
recipesRouter.put('/:id', (req, res) => {
    Recipe.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, updatedRecipe) => {
    if (error) {
      res.status(400).json( {error: error.message })
    } else {
      res.status(200).json({
        message: `Recipe ${updatedRecipe._id} updated successfully`,
        data: updatedRecipe
      })
    }
  })
})

module.exports = recipesRouter