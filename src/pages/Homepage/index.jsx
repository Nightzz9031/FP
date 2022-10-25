/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-array-index-key */
import * as React from 'react';
import { Box } from '@mui/material';
import { get, post } from '../../helpers/plugins/https';
import ResponsiveAppBar from '../../components/appbar';
import RecipeCard from './components/recipe-card';

const { uid } = require('uid');

const HomePage = () => {
  const [recipes, setRecipes] = React.useState([]);
  const [searchFilter, setSearchFilter] = React.useState('');

  const cardVisibility = '';

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

  const findRecipe = async () => {
      const res = await get('fetchallrecipes');
      setRecipes([...res]);
  };

  const validateSecret = async (secret) => {
    if (secret) {
    // eslint-disable-next-line @typescript-eslint/quotes, @typescript-eslint/space-infix-ops, prefer-template
    const res = await get(`getSecret/`+secret);
    }
  };

  const searchRecipe = async (searchTerm, e) => {
    const upperCaseSearchTerm = searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1);
    if (upperCaseSearchTerm.length > 1) {
      // eslint-disable-next-line @typescript-eslint/quotes, @typescript-eslint/space-infix-ops, prefer-template
    const res = await get(`recipe/`+upperCaseSearchTerm);
    setRecipes(res.data);
    console.log('My search: ', upperCaseSearchTerm);
    console.log('DB response: ', res.data);
    console.log('Current state: ', recipes);
    } else {
      findRecipe();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      searchRecipe(searchFilter);
    }
  };
  React.useEffect(() => {
    findRecipe();
    validateSecret();
  }, []);

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
    findRecipe();
  };

  return (
    <>
      <ResponsiveAppBar />
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
      <Box sx={{
 width: '100vh', my: '5px', mx: 'auto',
}}
      >
        <input type="text" placeholder="Search..." onChange={(e) => setSearchFilter(e.target.value)} onKeyDown={handleKeyDown} />
      </Box>
      <Box sx={{
 width: '100wh', height: 'auto', flexWrap: 'wrap', display: 'flex', visibility: cardVisibility,
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
            cardID={recipe._id}
            setState={setRecipes}
          />
        ))}
      </Box>
    </>
  );
};
export default HomePage;
