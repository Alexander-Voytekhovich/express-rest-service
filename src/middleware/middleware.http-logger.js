const { logger, createLog } = require('../common/logger');

function httpLogger(req, res, next) {
  console.log(13);
  const { method, url, query, body } = req;
  logger.http(createLog(method, url, query, body));
  next();
}

module.exports = httpLogger;
