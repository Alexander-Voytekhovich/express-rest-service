let tasksData = [];

const getAll = async boardId => tasksData.filter(el => el.boardId === boardId);

const get = async (boardId, id) =>
  tasksData.filter(el => el.boardId === boardId && el.id === id)[0];

const create = async task => {
  const { boardId, id } = task;
  tasksData.push(task);
  return get(boardId, id);
};

const update = async (boardId, id, task) => {
  tasksData.forEach((el, index) => {
    if (el.id === id && el.boardId === boardId) {
      tasksData[index].title = task.title;
      tasksData[index].order = task.order;
      tasksData[index].description = task.description;
      tasksData[index].description = task.description;
      tasksData[index].boardId = task.boardId;
      tasksData[index].columnId = task.columnId;
    }
  });
  return get(boardId, id);
};

const remove = async (boardId, id) => {
  const task = tasksData.findIndex(
    el => el.boardId === boardId && el.id === id
  );
  tasksData.splice(task, 1);
  return task;
};

const removeAll = async boardId => {
  tasksData = tasksData.filter(task => task.boardId !== boardId);
  return tasksData;
};

const resetBoardsId = async userId => {
  tasksData.forEach(el => {
    if (el.userId === userId) {
      el.userId = null;
    }
  });
  return tasksData;
};

module.exports = {
  getAll,
  get,
  create,
  remove,
  removeAll,
  update,
  resetBoardsId
};
