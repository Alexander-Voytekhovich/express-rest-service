const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');
const errorGenerator = require('http-errors');

router.route('/:boardId/tasks').get(async (req, res) => {
  const { boardId } = await req.params;
  const tasks = await tasksService.getAll(boardId);
  if (tasks) {
    return res.status(200).send(tasks.map(Task.toResponse));
  }
  return res.status(404).send('Tasks not found');
});

router.route('/:boardId/tasks/:id').get(async (req, res, next) => {
  const { boardId, id } = await req.params;
  try {
    const task = await tasksService.get(boardId, id);
    if (!task) throw new errorGenerator.NotFound('Task not found');
    return res.status(200).send(Task.toResponse(task));
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
  await tasksService.create(task);
  res.json(Task.toResponse(task));
});

router.route('/:boardId/tasks/:id').put(async (req, res) => {
  const { title, order, description, userId, columnId } = req.body;
  const { boardId, id } = req.params;
  const task = await new Task({
    title,
    order,
    description,
    userId,
    columnId
  });
  await tasksService.update(boardId, id, task);
  res.json(Task.toResponse(task));
});

router.route('/:boardId/tasks/:id').delete(async (req, res, next) => {
  const { boardId, id } = await req.params;
  try {
    await tasksService.remove(boardId, id);
    res.status(200).send('Task deleted!');
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
