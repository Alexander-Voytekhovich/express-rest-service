const boardsRepository = require('./board.db.repository');
const tasksRepository = require('../tasks/task.db.repository');

const getAll = () => boardsRepository.getAll();

const get = id => boardsRepository.get(id);

const create = board => boardsRepository.create(board);

const remove = async id => {
  await boardsRepository.remove(id);
  await tasksRepository.removeAll(id);
};

const update = (id, board) => boardsRepository.update(id, board);

module.exports = { getAll, get, create, remove, update };
