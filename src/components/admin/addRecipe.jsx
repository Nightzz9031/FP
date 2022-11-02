import React from 'react';
import { Box } from '@mui/material';
import { post } from '../../helpers/plugins/https';

const { uid } = require('uid');

const RecipeCreator = () => {
    const recipeRefs = {
        title: React.useRef(),
        calories: React.useRef(),
        sugar: React.useRef(),
        description: React.useRef(),
        image: React.useRef(),
        diet: React.useRef(),
        recipe: React.useRef(),
        ingredients: React.useRef(),
        servings: React.useRef(),
      };

      const addRecipe = async () => {
        const recipe = {
          id: uid(),
          title: recipeRefs.title.current.value,
          recipe: recipeRefs.recipe.current.value,
          ingredients: recipeRefs.ingredients.current.value,
          servings: recipeRefs.servings.current.value,
          macros: {
              calories: recipeRefs.calories.current.value,
              sugar: recipeRefs.sugar.current.value,
            },
          description: recipeRefs.description.current.value,
          image: recipeRefs.image.current.value,
          diet: recipeRefs.diet.current.value,
        };
        const res = await post('createRecipe', recipe);

        console.log(`Recipe added: ${res}`);
      };

      const clickHandler = () => {
        addRecipe();
      };

    return (
      <Box>
        <input id="title" type="text" ref={recipeRefs.title} placeholder="Title" />
        <input id="title" type="text" ref={recipeRefs.servings} placeholder="Servings" />
        <input id="calories" type="text" ref={recipeRefs.calories} placeholder="Calories per serving" />
        <input id="sugar" type="text" ref={recipeRefs.sugar} placeholder="Sugar per serving" />
        <input id="description" type="text" ref={recipeRefs.description} placeholder="Description" />
        <input id="img" type="text" ref={recipeRefs.image} placeholder="Image" />
        <input id="diet" type="text" ref={recipeRefs.diet} placeholder="Diet" />
        <input type="text" ref={recipeRefs.ingredients} placeholder="Ingredients" />
        <input type="text" ref={recipeRefs.recipe} placeholder="Recipe" />
        <button onClick={clickHandler}>ADD</button>
      </Box>
    );
};

export default RecipeCreator;
