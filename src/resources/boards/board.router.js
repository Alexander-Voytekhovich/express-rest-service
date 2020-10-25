const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const errorGenerator = require('http-errors');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  if (boards) {
    return res.status(200).send(boards.map(Board.toResponse));
  }
  return res.status(404).send('Boards not found');
});

router.route('/:id').get(async (req, res, next) => {
  const { id } = req.params;
  try {
    const board = await boardsService.get(id);
    if (!board) throw new errorGenerator.NotFound('Board not found');
    return res.status(200).send(Board.toResponse(board));
  } catch (err) {
    return next(err);
  }
});

router.route('/').post(async (req, res) => {
  const user = await boardsService.create(req.body);
  res.json(Board.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const board = await new Board(req.body);
  await boardsService.update(req.params.id, Board.toResponse(board));
  res.json(Board.toResponse(board));
});

router.route('/:id').delete(async (req, res, next) => {
  const { id } = req.params;
  try {
    await boardsService.remove(id);
    res.status(200).send('Board deleted!');
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
