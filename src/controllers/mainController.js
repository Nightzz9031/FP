/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable new-cap */

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

  getRecipes: async (req, res) => {
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

    new userSchema({
      email,
      password,
      avatar,
    }).save().then(() => {
      sendRes(res, false, 'All good', null);
    });
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    const userExists = await userSchema.findOne({ email, password });

    if (userExists) return sendRes(res, false, 'All good', userExists);

    sendRes(res, true, 'Bad credentials', null);
  },

  findOne: async (req, res) => {
    const { id } = req.params;
    console.log(id);

    const oneRecipe = await exportRecipe.findById({ _id: id });
    res.send({
      ok: 'ok',
      oneRecipe,
    });
  },

  info: async (req, res) => {
    res.send({ body: req.body });
  },
};
