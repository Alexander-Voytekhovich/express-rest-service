const usersRepo = require('./user.db.repository');
const tasksService = require('../tasks/task.memory.repository');

const getAll = () => usersRepo.getAll();

const get = id => usersRepo.get(id);

const create = user => usersRepo.create(user);

const remove = async id => {
  const removeStatus = await usersRepo.remove(id);
  if (removeStatus) tasksService.resetBoardsId(id);
  return removeStatus;
};

const update = (id, user) => usersRepo.update(id, user);

module.exports = { getAll, get, create, remove, update };
