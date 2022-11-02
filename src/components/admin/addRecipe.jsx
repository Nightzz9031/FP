import React from 'react';
import { Box, TextField } from '@mui/material';
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
        console.log(recipeRefs.title.current.value);
      };

    return (
      <Box>
        <TextField id="filled-basic" type="text" inputRef={recipeRefs.title} placeholder="Title" />
        <TextField id="filled-basic" type="text" inputRef={recipeRefs.servings} placeholder="Servings" />
        <TextField id="filled-basic" type="text" inputRef={recipeRefs.calories} placeholder="Calories per serving" />
        <TextField id="filled-basic" type="text" inputRef={recipeRefs.sugar} placeholder="Sugar per serving" />
        <TextField id="filled-basic" type="text" inputRef={recipeRefs.description} placeholder="Description" />
        <TextField id="filled-basic" type="text" inputRef={recipeRefs.image} placeholder="Image" />
        <TextField id="filled-basic" type="text" inputRef={recipeRefs.diet} placeholder="Diet" />
        <TextField id="filled-multiline-flexible" multiline type="text" inputRef={recipeRefs.ingredients} placeholder="Ingredients" />
        <TextField id="filled-multiline-flexible" multiline type="text" inputRef={recipeRefs.recipe} placeholder="Recipe" />
        <button onClick={clickHandler}>Add recipe</button>
      </Box>
    );
};

export default RecipeCreator;
