const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
      type: String,
      required: true,
  },
  password: {
    type: String,
    required: true,
  },
  secret: {
    type: String,
    require: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  favorites: {
    type: Array,
    required: false,
  },
  admin: {
    type: Boolean,
    required: false,
  },
});

const exportUser = mongoose.model('users', userSchema);

module.exports = exportUser;
