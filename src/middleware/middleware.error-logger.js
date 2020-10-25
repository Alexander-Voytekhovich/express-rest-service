const { logger, createErrorLog } = require('../common/logger');

function errorLogger(error, req, res, next) {
  const { status, message } = error;
  const { method, url } = req;

  if (error.status === 404) {
    logger.error(createErrorLog(status, message, method, url));
    res.status(404).send('Not found');
  } else {
    res.status(500).send('Internal server error');
    logger.error(createErrorLog(status, message, method, url));
  }
  next();
}

module.exports = errorLogger;
