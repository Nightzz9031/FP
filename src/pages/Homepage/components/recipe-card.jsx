/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import React from 'react';
import {
 Card, CardActions, CardContent, CardMedia, Button, Typography,
} from '@mui/material/';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { get, remove } from '../../../helpers/plugins/https';

const RecipeCard = ({
 title, image, calories, sugar, description, diet, cardID, setState,
}) => {
  const deleteRecipe = async () => {
    // eslint-disable-next-line @typescript-eslint/quotes, @typescript-eslint/space-infix-ops, prefer-template
    const res = await get(`delete/`+cardID);
    const data = await get('fetchallrecipes');
    setState([...data]);
    console.log('Title: ', cardID);
    console.log('DB response: ', res);
    console.log('New state: ', data);
};

  return (
    <Card sx={{
 width: '345px', height: 'auto', mt: '35px', mx: 'auto', border: '0.5px solid black', backgroundColor: '#cdf27e', direction: 'column',
}}
    >
      <Typography gutterBottom variant="h5" component="div">
        {title}
      </Typography>
      <CardMedia
        component="img"
        alt={title}
        height="200"
        image={image}
      />

      <Typography variant="h6" color="text.secondary">
        Calories:
        {calories}
      </Typography>
      <Typography variant="h6" color="text.secondary">
        Sugar:
        {sugar}
      </Typography>
      <Typography variant="h6" color="text.secondary">
        Diet:
        {diet}
      </Typography>
      <Typography variant="h6" color="text.secondary">
        ID:
        {cardID}
      </Typography>

      <CardContent>
        <Typography variant="body2" color="text.secondary" height="160px" overflow="clip">
          {description}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Button variant="contained" size="small">View recipe</Button>
        <DeleteOutlineIcon onClick={() => deleteRecipe()} sx={{ backgroundColor: 'error' }} />
        <Button variant="contained" size="small">Add to favorites</Button>
      </CardActions>

    </Card>
);
};

export default RecipeCard;
