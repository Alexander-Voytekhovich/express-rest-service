const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');
const errorGenerator = require('http-errors');

router.route('/:boardId/tasks').get(async (req, res) => {
  const { boardId } = await req.params;
  const tasks = await tasksService.getAll(boardId);
  if (tasks) {
    return res.status(200).send(tasks);
  }
  return res.status(404).send('Tasks not found');
});

router.route('/:boardId/tasks/:id').get(async (req, res, next) => {
  const { boardId, id } = await req.params;
  try {
    const task = await tasksService.get(boardId, id);
    if (!task) throw new errorGenerator.NotFound('Task not found');
    return res.status(200).send(task);
  } catch (err) {
    return next(err);
  }
});

router.route('/:boardId/tasks').post(async (req, res) => {
  const { title, order, description, userId, columnId } = req.body;
  const { boardId } = req.params;
  const task = await new Task({
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  });
  tasksService.create(task);
  res.json(task);
});

router.route('/:boardId/tasks/:id').put(async (req, res) => {
  const { title, order, description, columnId } = req.body;
  const { boardId, id } = req.params;
  const task = await new Task({
    title,
    order,
    description,
    userId: id,
    boardId,
    columnId
  });
  await tasksService.update(boardId, id, task);
  res.json(task);
});

router.route('/:boardId/tasks/:id').delete(async (req, res) => {
  const { boardId, id } = await req.params;
  await tasksService.remove(boardId, id);
  res.sendStatus(204);
});

module.exports = router;
