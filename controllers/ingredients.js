const express = require('express')
const ingredientsRouter = express.Router()
const Ingredient = require('../models/ingredient')

// GET (index) list of ingredients
ingredientsRouter.get('/', (req, res) => {
  Ingredient.find({}, (error, foundIngredients) => {
    if(error) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(200).json(foundIngredients)
    }
  })
})

// POST create a Ingredient
ingredientsRouter.post('/', (req, res) => {
  Ingredient.create(req.body, (error, newIngredient) => {
    if(error) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(200).json(newIngredient)
    }
  })
})

// DELETE delete an Ingredient
ingredientsRouter.delete('/:id', (req, res) => {
    Ingredient.findByIdAndDelete(req.params.id, (error, deletedIngredient) => {
    if(error) {
      res.status(400).json({ error: error.message })
    } else if (deletedIngredient === null) {
      res.status(404).json({ message: 'Ingredient id not Found'})
    } else {
      res.status(200).json({ message: `Ingredient ${deletedIngredient.name} deleted successfully`})
    }
  })
})

// UPDATE update a holiday
ingredientsRouter.put('/:id', (req, res) => {
    Ingredient.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, updatedIngredient) => {
    if (error) {
      res.status(400).json( {error: error.message })
    } else {
      res.status(200).json({
        message: `Ingredient ${updatedIngredient._id} updated successfully`,
        data: updatedIngredient
      })
    }
  })
})


module.exports = ingredientsRouter;
