/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-array-index-key */
import * as React from 'react';
import { Box } from '@mui/material';
import { get, post } from '../../helpers/plugins/https';
import ResponsiveAppBar from '../../components/appbar';
import RecipeCard from '../../components/recipe-card';
import { validateSecret, validateAdmin } from '../../helpers/plugins/validations';
import RecipeCreator from '../../components/admin/addRecipe';

const secret = localStorage.getItem('secret');

const HomePage = () => {
  const [recipes, setRecipes] = React.useState([]);
  const [searchFilter, setSearchFilter] = React.useState('');
  const [loginState, setLoginState] = React.useState(false);
  const [adminState, setAdminState] = React.useState(false);

  const cardVisibility = '';

  const findRecipe = async () => {
      const res = await get('fetchallrecipes');
      setRecipes([...res]);
  };

  const searchRecipe = async (searchTerm, e) => {
    const upperCaseSearchTerm = searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1);
    if (upperCaseSearchTerm.length > 1) {
      // eslint-disable-next-line @typescript-eslint/quotes, @typescript-eslint/space-infix-ops, prefer-template
    const res = await get(`search/`+upperCaseSearchTerm);
    setRecipes(res.data);
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
    validateAdmin(secret, setAdminState);
    validateSecret(secret, setLoginState);
  }, [loginState], [adminState], [recipes]);

  return (
    <>
      <ResponsiveAppBar validateSecret={validateSecret} />
      {adminState ? (
        <RecipeCreator />
      ) : null}
      <Box sx={{ backgroundImage: 'url(https://png.pngtree.com/png-vector/20191001/ourlarge/pngtree-fast-food-seamless-background-with-ice-cream-burger-chocolate-pizza-french-png-image_1770104.jpg)', backgroundRepeat: 'repeat' }}>

        <Box sx={{
        width: '100vh', my: '5px', mx: 'auto',
      }}
        >
          <input type="text" placeholder="Search..." onChange={(e) => setSearchFilter(e.target.value)} onKeyDown={handleKeyDown} />
        </Box>
        <Box sx={{
        width: '100wh', height: '100vh', flexWrap: 'wrap', display: 'flex', visibility: cardVisibility,
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
      </Box>

    </>
  );
};
export default HomePage;
