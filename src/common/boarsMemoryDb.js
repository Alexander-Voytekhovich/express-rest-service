const Board = require('../resources/boards/board.model');

let DB = [];

DB.push(new Board(), new Board(), new Board());

const getAllBoards = async () => [...DB];

const getBoard = async id => DB.filter(el => el.id === id)[0];

const createBoard = async board => {
  DB.push(board);
  return board;
};

const removeBoard = async id => {
  DB = DB.filter(el => el.id !== id);
  return DB.filter(el => el.id === id)[0];
};

const updateBoard = async (id, board) => {
  DB.forEach((el, index) => {
    console.log(el.id, id);
    if (el.id === id) {
      DB[index].title = board.title;
      DB[index].columns = board.columns;
    }
  });
  return DB.filter(el => el.id === id)[0];
};

module.exports = {
  getAllBoards,
  getBoard,
  createBoard,
  removeBoard,
  updateBoard
};
