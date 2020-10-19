const { logger, createStatisticLog } = require('../common/logger');

function httpLogger(req, res, next) {
  const { method, url, query, body } = req;
  logger.http(createStatisticLog(method, url, query, body));
  next();
}

module.exports = httpLogger;
