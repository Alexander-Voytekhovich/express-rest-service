const mongoose = require('mongoose');
const { SALT } = require('../..//common/config');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    name: String,
    login: String,
    password: String
  },
  { collection: 'users', versionKey: false }
);

userSchema.pre('save', async function cryptPassword(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  try {
    user.password = await bcrypt.hash(user.password, SALT);
    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.statics.toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};

const User = mongoose.model('User', userSchema);

module.exports = User;
