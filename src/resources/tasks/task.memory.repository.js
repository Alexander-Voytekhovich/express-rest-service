const DB = require('../../common/tasksMemoryDb');

const getAll = async boardId => DB.getAllTasks(boardId);

const get = async (boardId, id) => {
  const task = DB.getTask(boardId, id);

  if (!task) {
    throw new Error(`The user with id "${id}" was not found`);
  }

  return task;
};

const create = async task => {
  return DB.createTask(task);
};

const remove = async (boardId, id) => {
  return DB.removeTask(boardId, id);
};

const update = async (boardId, id, task) => {
  return DB.updateTask(boardId, id, task);
};

module.exports = { getAll, get, create, remove, update };
