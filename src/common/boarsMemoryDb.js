const Board = require('../resources/boards/board.model');
const taskData = require('./tasksMemoryDb');

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
  taskData.DB = taskData.DB.filter(el => el.boardId !== id);
  return DB.filter(el => el.id === id)[0];
};

const updateBoard = async (id, board) => {
  DB.forEach((el, index) => {
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
