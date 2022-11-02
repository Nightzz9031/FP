/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-array-index-key */
import * as React from 'react';
import { Box } from '@mui/material';
import { get, post } from '../../helpers/plugins/https';
import ResponsiveAppBar from '../../components/appbar';
import RecipeCard from '../../components/recipe-card';
import { validateSecret } from '../../helpers/plugins/validations';

const HomePage = () => {
  const secret = localStorage.getItem('secret');
  const [favorites, setFavorites] = React.useState([]);

  const cardVisibility = '';

  const findUserFavorites = async () => {
      const res = await get(`getFavorites/${secret}`);
      setFavorites(res.data);
  };

  const removeFavorite = async (id) => {
    const res = await get(`favorites${id}`);

    console.log('hello');
  };

  React.useEffect(() => {
    findUserFavorites();
  }, []);

  return (
    <>
      <ResponsiveAppBar validateSecret={validateSecret} />
      <Box sx={{
 width: '100wh', height: 'auto', flexWrap: 'wrap', display: 'flex', visibility: cardVisibility,
}}
      >
        {favorites.map((recipe, i) => (
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
            setState={setFavorites}
            remove={removeFavorite}
          />
        ))}
      </Box>
    </>
  );
};
export default HomePage;
