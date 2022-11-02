/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable new-cap */

const bcrypt = require('bcrypt');
const { uid } = require('uid');
const exportRecipe = require('../schemas/recipeSchema');
const recipeSchema = require('../schemas/recipeSchema');
// const exportUser = require('../schemas/userSchema');
const userSchema = require('../schemas/userSchema');
const sendRes = require('../modules/universalRes');

module.exports = {
  addRecipe: async (req, res) => {
    const newRecipe = new recipeSchema(req.body);
    await newRecipe.save();

    res.send({ recipe: newRecipe });
  },

  getRecipes: (req, res) => {
    exportRecipe.find((err, val) => {
      if (err) {
        console.log(err);
      } else {
        res.json(val);
      }
    });
  },

  register: async (req, res) => {
    const { email, password, avatar } = req.body;

    const hash = await bcrypt.hash(password, 10);

    new userSchema({
      email,
      password: hash,
      secret: uid(),
      avatar,
    }).save().then(() => {
      sendRes(res, false, 'Registered successfully', null);
    });
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    const userExists = await userSchema.findOne({ email });

    if (userExists) {
      const compare = await bcrypt.compare(password, userExists.password);

      if (compare) return sendRes(res, false, 'All good', { secret: userExists.secret });
    }

    sendRes(res, true, 'Bad credentials', null);
  },

  findOne: async (req, res) => {
    const { param } = req.params;

    const oneRecipe = await recipeSchema.find({ title: { $regex: param } });
    return sendRes(res, false, 'Found one recipe', oneRecipe);
  },

  deleteOne: async (req, res) => {
    const { id } = req.params;

    const deletedRecipe = await recipeSchema.findOneAndRemove(id);
    return sendRes(res, false, 'Recipe deleted', deletedRecipe);
  },

  getSecret: async (req, res) => {
    const { secret } = req.params;

    const userSecret = await userSchema.findOne({ secret });

    return sendRes(res, false, 'Secret found', userSecret.secret);
  },

  getAvatar: async (req, res) => {
    const { secret } = req.params;

    const user = await userSchema.findOne({ secret });

    return sendRes(res, false, 'Found avatar', user.avatar);
  },

  addFavorite: async (req, res) => {
    const { secret } = req.params;
    const { recipe } = req.body;

    const user = await userSchema.findOneAndUpdate(
    {
      secret,
    },
    { $addToSet: { favorites: recipe } },
);

    return sendRes(res, false, 'Recipe added to favorites', user.favorites);
  },

  getFavorites: async (req, res) => {
    const { secret } = req.params;

    const user = await userSchema.findOne({ secret });

    return sendRes(res, false, 'Found favorite recipes', user.favorites);
  },

  removeFavorite: async (req, res) => {
    const { id } = req.param;

    const user = await userSchema.updateOne({
      $pull: {
        favorites: { id },
      },
    });

    return sendRes(res, false, 'Removed from favorites', user.favorites);
  },

  recipeById: async (req, res) => {
    const { id } = req.params;

    const recipe = await recipeSchema.findOne({ _id: id });

    return sendRes(res, false, 'Found recipe by ID', recipe);
  },

  getUser: async (req, res) => {
    const { secret } = req.params;

    const user = await userSchema.findOne({ secret });

    sendRes(res, false, 'Found user', user);
  },
};
