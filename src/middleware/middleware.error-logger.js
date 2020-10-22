const { logger, createErrorLog } = require('../common/logger');

function errorLogger(error, req, res, next) {
  const { message, status } = error;
  const { method, url, query, body } = req;

  if (error.status === 404) {
    logger.error(createErrorLog(status, message, method, url, query, body));
    res.status(404).send('Not found');
  } else {
    res.status(500).send('Internal server error');
    logger.error(createErrorLog(error, message, method, url, query, body));
  }
  next();
}

module.exports = errorLogger;
