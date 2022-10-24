const mongoose = require('mongoose');

const { Schema } = mongoose;

const recipeSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
      type: String,
      required: true,
  },
  servings: {
    type: Number,
    required: true,
  },
  recipe: {
   type: String,
   required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  macros: {
      calories: {
        type: Number,
        required: true,
      },
      sugar: {
        type: Number,
        required: true,
      },
  },
  description: {
      type: String,
      required: true,
  },
  image: {
      type: String,
      required: true,
  },
  diet: {
    type: String,
    required: true,
  },
});

const exportRecipe = mongoose.model('Recipes', recipeSchema);

module.exports = exportRecipe;
