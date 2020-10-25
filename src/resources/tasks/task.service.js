const tasksRepository = require('./task.db.repository');

const getAll = boardId => tasksRepository.getAll(boardId);

const get = (boardId, id) => tasksRepository.get(boardId, id);

const create = task => tasksRepository.create(task);

const remove = (boardId, id) => tasksRepository.remove(boardId, id);

const removeBoardTasks = boardId => tasksRepository.removeAll(boardId);

const update = (boardId, id, task) => tasksRepository.update(boardId, id, task);

module.exports = { getAll, get, create, remove, removeBoardTasks, update };
