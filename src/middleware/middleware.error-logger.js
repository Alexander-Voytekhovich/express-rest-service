const { logger, createErrorLog } = require('../common/logger');

function errorLogger(error, req, res, next) {
  const { status } = error;
  const { method, url } = req;

  if (error.status === 404) {
    logger.error(createErrorLog(error, status, method, url));
    res.status(404).send('Not found');
  } else {
    res.status(500).send('Internal server error');
    logger.error(createErrorLog(error, status, method, url));
  }
  next();
}

module.exports = errorLogger;
