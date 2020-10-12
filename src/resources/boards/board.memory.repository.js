const DB = require('../../common/boarsMemoryDb');

const getAll = async () => {
  return DB.getAllBoards();
};

const get = async id => {
  const board = DB.getBoard(id);
  if (!board) {
    throw new Error(`The user with id "${id}" was not found`);
  }

  return board;
};

const create = async board => {
  return DB.createBoard(board);
};

const remove = async id => {
  return DB.removeBoard(id);
};

const update = async (id, board) => {
  return DB.updateBoard(id, board);
};

module.exports = { getAll, get, create, remove, update };
