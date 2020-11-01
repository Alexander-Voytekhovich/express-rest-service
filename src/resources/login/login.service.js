const loginRepository = require('./login.db.repository');

const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY, TOKEN_EXPIRES } = require('../../common/config');

const bcrypt = require('bcrypt');

const verifyUser = async user => {
  const isUser = await loginRepository.get(user);

  if (!isUser) return false;

  const { id, login, password } = isUser;

  const isPassword = await bcrypt.compare(user.password, password);

  if (!isPassword) return false;

  return jwt.sign({ id, login }, JWT_SECRET_KEY, { expiresIn: TOKEN_EXPIRES });
};

module.exports = { verifyUser };
