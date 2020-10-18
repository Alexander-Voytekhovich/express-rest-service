const boardsRepo = require('./board.memory.repository');
const tasksService = require('../tasks/task.memory.repository');

const getAll = () => boardsRepo.getAll();

const get = id => boardsRepo.get(id);

const create = board => boardsRepo.create(board);

const remove = async id => {
  const removeStatus = await boardsRepo.remove(id);
  if (removeStatus) tasksService.removeAll(id);
  return removeStatus;
};

const update = (id, board) => boardsRepo.update(id, board);

module.exports = { getAll, get, create, remove, update };
