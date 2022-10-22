/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-array-index-key */
import * as React from 'react';
import { Box } from '@mui/material';
import { get, post } from '../../helpers/plugins/https';
import ResponsiveAppBar from '../../components/appbar';
import RecipeCard from './components/recipe-card';

const HomePage = () => {
  const [recipes, setRecipes] = React.useState([]);

  const recipeRefs = {
    title: React.useRef(),
    calories: React.useRef(),
    sugar: React.useRef(),
    description: React.useRef(),
    image: React.useRef(),
    diet: React.useRef(),
  };

  const findRecipe = async () => {
      const res = await get('fetchallrecipes');
      setRecipes([...res]);
    };

  React.useEffect(() => {
    findRecipe();
      }, []);

  const addRecipe = async () => {
    const recipe = {
      title: recipeRefs.title.current.value,
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
    findRecipe();
  };

  return (
    <>
      <ResponsiveAppBar />
      <input id="title" type="text" ref={recipeRefs.title} placeholder="Title" />
      <input id="calories" type="text" ref={recipeRefs.calories} placeholder="Calories" />
      <input id="sugar" type="text" ref={recipeRefs.sugar} placeholder="Sugar" />
      <input id="description" type="text" ref={recipeRefs.description} placeholder="Description" />
      <input id="img" type="text" ref={recipeRefs.image} placeholder="Image" />
      <input id="diet" type="text" ref={recipeRefs.diet} placeholder="Diet" />
      <button onClick={clickHandler}>ADD</button>
      <Box sx={{
 width: '100wh', height: 'auto', border: '5px solid black', flexWrap: 'wrap', display: 'flex',
}}
      >
        {recipes.map((recipe, i) => (
          <RecipeCard
            key={i}
            title={recipe.title}
            image={recipe.image}
            calories={recipe.macros.calories}
            sugar={recipe.macros.sugar}
            description={recipe.description}
            diet={recipe.diet}
            // eslint-disable-next-line no-underscore-dangle
            id={recipe._id}
          />
        ))}
      </Box>
    </>
  );
};
export default HomePage;
