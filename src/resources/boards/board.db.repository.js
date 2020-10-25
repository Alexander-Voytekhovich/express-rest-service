const Board = require('./board.model');

const getAll = async () => {
  return Board.find({});
};

const get = async id => {
  return Board.findById(id);
};

const create = async board => {
  return Board.create(board);
};

const update = async (id, board) => {
  await Board.updateOne({ _id: id }, board);
  return get(id);
};

const remove = async id => {
  return await Board.deleteOne({ _id: id });
};

module.exports = { getAll, get, create, remove, update };
