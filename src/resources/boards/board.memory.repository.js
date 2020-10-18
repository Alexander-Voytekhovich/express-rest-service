const boardsData = [];

const getAll = async () => boardsData;

const get = async id => boardsData.filter(el => el.id === id)[0];

const create = async user => {
  const { id } = user;
  boardsData.push(user);
  return get(id);
};

const update = async (id, board) => {
  boardsData.forEach((el, index) => {
    if (el.id === id) {
      boardsData[index].title = board.title;
      boardsData[index].columns = board.columns;
    }
  });
  return get(id);
};

const remove = async id => {
  const board = boardsData.findIndex(el => el.id === id);
  boardsData.splice(board, 1);
  return board;
};

module.exports = { getAll, get, create, remove, update };
