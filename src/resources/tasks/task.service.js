const tasksRepo = require('./task.memory.repository');

const getAll = boardId => tasksRepo.getAll(boardId);

const get = (boardId, id) => tasksRepo.get(boardId, id);

const create = task => tasksRepo.create(task);

const remove = (boardId, id) => tasksRepo.remove(boardId, id);

const update = (boardId, id, task) => tasksRepo.update(boardId, id, task);

module.exports = { getAll, get, create, remove, update };
