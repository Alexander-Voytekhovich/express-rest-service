const usersRepository = require('./user.db.repository');
const tasksRepository = require('../tasks/task.db.repository');

const getAll = () => usersRepository.getAll();

const get = id => usersRepository.get(id);

const create = user => usersRepository.create(user);

const remove = async id => {
  await usersRepository.remove(id);
  await tasksRepository.resetBoardsId(id);
};

const update = (id, user) => usersRepository.update(id, user);

module.exports = { getAll, get, create, remove, update };
