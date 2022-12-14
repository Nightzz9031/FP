/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
const isEmail = require('is-email');
const userSchema = require('../schemas/userSchema');
const sendRes = require('../modules/universalRes');

module.exports = {
    emailValid: (req, res, next) => {
        const { email } = req.body;
        if (!isEmail(email)) return sendRes(res, true, 'Bad email format', null);
        next();
    },
    passwordsValid: (req, res, next) => {
        const { password, passwordTwo } = req.body;

        if (password !== passwordTwo) return sendRes(res, true, 'Passwords do not match', null);
        if (passwordTwo.length < 5 || passwordTwo.length > 20) return sendRes(res, true, 'Bad password length', null);

        next();
    },
    userValid: async (req, res, next) => {
        const { email } = req.body;

        const userExists = await userSchema.findOne({ email });

        console.log(userExists);

        if (userExists) {
            return sendRes(res, true, 'User already exists', null);
        }

        next();
    },

    avatarValid: async (req, res, next) => {
        const { avatar } = req.body;

        if (!avatar) {
            return res.send({ error: true, message: 'Please enter a valid avatar URL' });
        }

        next();
    },

    secretValid: async (req, res, next) => {
        const { secret } = req.params;

        const userExists = await userSchema.findOne({ secret });

        if (!userExists) return sendRes(res, true, 'Bad user secret', null);

        next();
    },

};
