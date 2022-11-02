/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  Card, CardActions, CardContent, CardMedia, Button, Typography, Box, Paper,
 } from '@mui/material/';
import { useParams } from 'react-router-dom';
import { get, post } from '../../helpers/plugins/https';
import ResponsiveAppBar from '../../components/appbar';
import '../../styles/global.scss';
import { validateSecret, validateAdmin } from '../../helpers/plugins/validations';

const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = React.useState();

  React.useEffect(() => {
    const fetchRecipe = async () => {
      const res = await get(`recipe/${id}`);
      setRecipe(res.data);
      console.log(recipe);
    };

    fetchRecipe();
  }, []);

  return (
    <>
      <ResponsiveAppBar validateSecret={validateSecret} />
      <Box sx={{
 border: '5px solid black', justifyContent: 'center', alignItems: 'center', height: '100vh',
}}
      >
        <Box sx={{
        width: 400, height: 400, boxShadow: 10, borderRadius: '20px',
      }}
        >
          <Box sx={{
 border: '1px solid red', width: 'auto', display: 'inline-flex',
}}
          >
            {recipe ? (
              <>
                <CardMedia
                  sx={{ borderRadius: '20px', width: 400 }}
                  component="img"
                  alt={recipe.title}
                  height="400"
                  image={recipe.image}
                />
                <Paper sx={{ width: '500px' }}>
                  <p className="pre">Recipe:</p>

                  <Typography>
                    {recipe.description}
                    <p>
                      Calories:
                      {recipe.macros.calories}
                    </p>
                    <p>
                      Sugar:
                      {recipe.macros.sugar}
                    </p>
                  </Typography>
                  <Typography>
                    {recipe.recipe}

                  </Typography>
                </Paper>

              </>
            ) : (
              <CardMedia
                sx={{ borderRadius: '20px' }}
                component="img"
                alt="Loading"
                height="400"
                width="400"
                image="https://www.nicepng.com/png/detail/856-8565223_search-icon-loading-loading-icon-png-transparent.png"
              />
            ) }
          </Box>
        </Box>
      </Box>

    </>
);
};

export default RecipePage;
