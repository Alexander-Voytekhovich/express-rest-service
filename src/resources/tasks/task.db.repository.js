const Task = require('./task.model');

const taskData = [
  new Task({
    title: '13',
    order: '14',
    description: '15',
    userId: '16',
    boardId: '17',
    columnId: '17'
  }),
  new Task({
    title: '13',
    order: '14',
    description: '15',
    userId: '16',
    boardId: '17',
    columnId: '17'
  })
];

const getAll = async boardId => {
  return Task.find({ boardId });
};

const get = async (boardId, id) => {
  return Task.findOne({ boardId, _id: id });
};

const create = async task => {
  return Task.create(task);
};

const update = async (boardId, id, task) => {
  return Task.findOneAndUpdate(
    { _id: id, boardId },
    {
      title: task.title,
      order: task.order,
      description: task.description,
      userId: task.userId,
      columnId: task.columnId
    }
  );
};

const remove = async (boardId, id) => {
  return await Task.deleteOne({ boardId, _id: id });
};

/* const removeAll = async boardId => {
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
}; */

module.exports = {
  getAll,
  get,
  create,
  remove,
  // removeAll,
  update,
  // resetBoardsId
  taskData
};
