const { createLogger, format, transports } = require('winston');
const path = require('path');

const options = {
  transports: [
    new transports.File({
      filename: path.join(__dirname, '../logs/http.log'),
      level: 'http',
      format: format.combine(
        format.uncolorize(),
        format.json(),
        format.simple()
      )
    }),
    new transports.File({
      filename: path.join(__dirname, '../logs/errors.log'),
      level: 'error',
      format: format.combine(
        format.uncolorize(),
        format.json(),
        format.simple()
      )
    }),
    new transports.Console({
      level: 'http',
      format: format.combine(format.colorize(), format.cli())
    })
  ]
};

function formatDate() {
  const currentDate = new Date();

  let day = currentDate.getDay() + 1;
  if (day < 10) day = `0${day}`;

  let month = currentDate.getMonth() + 1;
  if (month < 10) month = `0${month}`;

  const year = currentDate.getFullYear();

  let hours = currentDate.getHours();
  if (hours < 10) hours = `0${hours}`;

  let minutes = currentDate.getMinutes();
  if (minutes < 10) minutes = `0${minutes}`;

  let seconds = currentDate.getSeconds();
  if (seconds < 10) seconds = `0${seconds}`;

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

function objectToString(obj) {
  return JSON.stringify(obj);
}

function createLog(method, url, query, body) {
  return `${formatDate()} // method - ${method} // url - ${url} // query - ${objectToString(
    query
  )} // body - ${objectToString(body)}`;
}

const logger = createLogger(options);

module.exports = { logger, createLog };
