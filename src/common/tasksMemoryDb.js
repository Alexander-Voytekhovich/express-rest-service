let DB = [];

DB.push();

const getAllTasks = async boardId => DB.filter(el => el.boardId === boardId);

const getTask = async (boardId, id) => {
  const boardTasks = DB.filter(el => el.boardId === boardId);
  return boardTasks.filter(el => el.id === id)[0];
};

const createTask = async task => {
  DB.push(task);
  return task;
};

const removeTask = async (boardId, id) => {
  DB = DB.filter(el => el.id !== id);
  return DB.filter(el => el.id === id)[0];
};

const updateTask = async (boardId, id, task) => {
  DB.forEach((el, index) => {
    if (el.id === id && el.boardId === boardId) {
      DB[index].title = task.title;
      DB[index].order = task.order;
      DB[index].description = task.description;
      DB[index].description = task.description;
      DB[index].boardId = task.boardId;
      DB[index].columnId = task.columnId;
    }
  });
  return DB.filter(el => el.id === id)[0];
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  removeTask,
  updateTask,
  DB
};
