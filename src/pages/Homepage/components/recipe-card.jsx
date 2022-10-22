import React from 'react';
import {
 Card, CardActions, CardContent, CardMedia, Button, Typography,
} from '@mui/material/';

const RecipeCard = ({
 title, image, calories, sugar, description, diet, id,
}) => (
  <Card sx={{
 width: '345px', height: 'auto', mt: '35px', mx: 'auto', border: '0.5px solid black', backgroundColor: '#cdf27e',
}}>
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
      {id}
    </Typography>

    <CardContent>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>

    <CardActions sx={{ justifyContent: 'space-evenly', position: '' }}>
      <Button variant="contained" size="small">View recipe</Button>
      <Button variant="contained" size="small">Add to favorites</Button>
    </CardActions>

  </Card>
  );

export default RecipeCard;
