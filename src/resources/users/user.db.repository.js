const User = require('./user.model');

const usersData = [
  new User({ name: '13', login: '14', password: '15' }),
  new User({ name: '14', login: '15', password: '16' })
];

const getAll = async () => {
  return User.find({});
};

const get = async id => {
  return User.findById(id);
};

const create = async user => {
  return User.create(user);
  /*   usersData.push(user);
  return user; */
};

const update = async (id, user) => {
  await User.updateOne({ _id: id }, user);
  return get(id);
};

const remove = async id => {
  return await User.deleteOne({ _id: id });
};

module.exports = { getAll, get, create, remove, update, usersData };
