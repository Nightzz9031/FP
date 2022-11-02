/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
const express = require('express');

const router = express.Router();

const {
 emailValid, passwordsValid, userValid, secretValid,
} = require('../middleware/mainMiddleware');

const {
 getRecipes, addRecipe, findOne, register, login, getAvatar, deleteOne, getSecret, addFavorite, getFavorites, removeFavorite, recipeById, getUser,
} = require('../controllers/mainController');

router.get('/fetchallrecipes', getRecipes);
router.post('/createRecipe', addRecipe);
router.get('/delete/:id', deleteOne);
router.get('/search/:param', findOne);
router.get('/recipe/:id', recipeById);

router.post('/register', emailValid, passwordsValid, userValid, register);
router.post('/login', login);

router.get('/getUser/:secret', secretValid, getUser);
router.get('/getAvatar/:secret', secretValid, getAvatar);
router.get('/getSecret/:secret', secretValid, getSecret);
router.get('/getFavorites/:secret', secretValid, getFavorites);

router.post('/addFavorite/:secret', addFavorite);
router.get('/favorite/:id', removeFavorite);

module.exports = router;
