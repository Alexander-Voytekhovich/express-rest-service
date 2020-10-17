const { logger } = require('../common/logger');

function errorLogger(error, req, res, next) {
  console.log(14);
  logger.error(error);
  res.status(500).json({
    error: 'Internal Server Error'
  });
  next();
}

module.exports = errorLogger;
