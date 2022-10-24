/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
const express = require('express');

const router = express.Router();

const {
 emailValid, passwordsValid, userValid, secretValid,
} = require('../middleware/mainMiddleware');

const {
 getRecipes, addRecipe, findOne, register, login, getAvatar, deleteOne,
} = require('../controllers/mainController');

router.get('/fetchallrecipes', getRecipes);
router.post('/createRecipe', addRecipe);
router.get('/delete/:id', deleteOne);
router.get('/recipe/:search', findOne);

router.post('/register', emailValid, passwordsValid, userValid, register);
router.post('/login', login);

router.get('/getAvatar/:secret', secretValid, getAvatar);

module.exports = router;
