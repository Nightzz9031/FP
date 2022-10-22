/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
const express = require('express');

const router = express.Router();

const {
 emailValid, passwordsValid, userValid,
} = require('../middleware/mainMiddleware');

const {
 getRecipes, addRecipe, findOne, register, login,
} = require('../controllers/mainController');

router.get('/fetchallrecipes', getRecipes);
router.post('/createRecipe', addRecipe);
router.get('/recipe/:id', findOne);

router.post('/register', emailValid, passwordsValid, userValid, register);
router.post('/login', login);

module.exports = router;
