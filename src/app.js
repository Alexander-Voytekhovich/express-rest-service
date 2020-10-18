const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');

const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

const httpLogger = require('./middleware/middleware.http-logger');
const errorLogger = require('./middleware/middleware.error-logger');

const { logger, createUnhandledEventLog } = require('./common/logger');

const endProcess = process.exit;

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(httpLogger);

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards', taskRouter);

process.on('unhandledRejection', error => {
  logger.error(createUnhandledEventLog(error));
  endProcess(1);
});

process.on('uncaughtException', error => {
  logger.error(createUnhandledEventLog(error));
  endProcess(1);
});

app.use(errorLogger);

/* setTimeout(() => {
  throw Error('Oops!');
}, 2000); */

/* setTimeout(() => {
  Promise.reject(Error('Oops!'));
}, 5000); */

module.exports = app;
