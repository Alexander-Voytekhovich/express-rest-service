const jwt = require('jsonwebtoken');
const errorGenerator = require('http-errors');
const { JWT_SECRET_KEY } = require('../common/config');

const authentication = (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      throw new errorGenerator.NotAcceptable('Invalid token');
    }

    token = token.split(' ')[1];

    jwt.sign(token, JWT_SECRET_KEY);
  } catch (error) {
    res.status(401).send('Unauthorized');
    return;
  }
  next();
};

module.exports = {
  authentication
};
