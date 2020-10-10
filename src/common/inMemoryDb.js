const User = require('../resources/users/user.model');

let DB = [];

DB.push(new User(), new User(), new User());

const getAllUsers = async () => [...DB];

const getUser = async id => DB.filter(el => el.id === id)[0];

const createUser = async user => {
  DB.push(user);
  return user;
};

const removeUser = async id => {
  DB = DB.filter(el => el.id !== id);
  return DB.filter(el => el.id === id)[0];
};

const updateUser = async (id, user) => {
  DB.forEach((el, index) => {
    console.log(el.id, id);
    if (el.id === id) {
      DB[index].name = user.name;
      DB[index].login = user.login;
      DB[index].password = user.password;
    }
  });
  return DB.filter(el => el.id === id)[0];
};

module.exports = { getAllUsers, getUser, createUser, removeUser, updateUser };
