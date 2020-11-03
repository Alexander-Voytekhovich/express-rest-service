const errorGenerator = require('http-errors');

const authentication = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      throw new errorGenerator.Unauthorized('Unauthorized');
    }
  } catch (error) {
    res.status(401).send('Unauthorized');
    return;
  }
  next();
};

module.exports = {
  authentication
};
