const DB = require('../../common/usersMemoryDb');

const getAll = async () => DB.getAllUsers();

const get = async id => {
  const user = DB.getUser(id);

  if (!user) {
    throw new Error(`The user with id "${id}" was not found`);
  }

  return user;
};

const create = async user => {
  return DB.createUser(user);
};

const remove = async id => {
  return DB.removeUser(id);
};

const update = async (id, user) => {
  return DB.updateUser(id, user);
};

module.exports = { getAll, get, create, remove, update };
