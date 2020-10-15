const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/:boardId/tasks').get(async (req, res) => {
  const { boardId } = await req.params;
  const tasks = await tasksService.getAll(boardId);
  if (tasks) {
    return res.status(200).send(tasks);
  }
  return res.status(404).send('Not found');
});

router.route('/:boardId/tasks/:id').get(async (req, res) => {
  const { boardId, id } = await req.params;
  const task = await tasksService.get(boardId, id);
  if (task) {
    return res.status(200).send(task);
  }
  return res.status(404).send('Not found');
});

router.route('/:boardId/tasks').post(async (req, res) => {
  const task = await new Task({
    title: req.body.title,
    order: req.body.order,
    description: req.body.description,
    userId: req.body.userId,
    boardId: req.params.boardId,
    columnId: req.body.columnId
  });
  tasksService.create(task);
  res.json(task);
});

router.route('/:boardId/tasks/:id').put(async (req, res) => {
  const { boardId, id } = await req.params;
  const task = await new Task({
    title: req.body.title,
    order: req.body.order,
    description: req.body.description,
    userId: req.params.userId,
    boardId: req.params.boardId,
    columnId: req.body.columnId
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
