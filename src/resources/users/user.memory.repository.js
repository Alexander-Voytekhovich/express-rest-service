const usersData = [];

const getAll = async () => usersData;

const get = async id => usersData.filter(el => el.id === id)[0];

const create = async user => {
  usersData.push(user);
  return user;
};

const update = async (id, user) => {
  usersData.forEach((el, index) => {
    if (el.id === id) {
      usersData[index].name = user.name;
      usersData[index].login = user.login;
      usersData[index].password = user.password;
    }
  });
  return get(id);
};

const remove = async id => {
  const user = usersData.findIndex(el => el.id === id);
  usersData.splice(user, 1);
  return 'user deleted';
};

module.exports = { getAll, get, create, remove, update };
