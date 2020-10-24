const tasksRepo = require('./task.db.repository');

const getAll = boardId => tasksRepo.getAll(boardId);

const get = (boardId, id) => tasksRepo.get(boardId, id);

const create = task => tasksRepo.create(task);

const remove = (boardId, id) => tasksRepo.remove(boardId, id);

const removeBoardTasks = boardId => tasksRepo.removeAll(boardId);

const update = (boardId, id, task) => tasksRepo.update(boardId, id, task);

module.exports = { getAll, get, create, remove, removeBoardTasks, update };
