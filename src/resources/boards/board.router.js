const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const errorGenerator = require('http-errors');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  if (boards) {
    return res.status(200).send(boards);
  }
  return res.status(404).send('Boards not found');
});

router.route('/:id').get(async (req, res, next) => {
  const { id } = req.params;
  try {
    const board = await boardsService.get(id);
    if (!board) throw new errorGenerator.NotFound('Board not found');
    return res.status(200).send(board);
  } catch (err) {
    return next(err);
  }
});

router.route('/').post(async (req, res) => {
  const { title, columns } = req.body;
  const board = await boardsService.create(
    new Board({
      title,
      columns
    })
  );
  res.json(board);
});

router.route('/:id').put(async (req, res) => {
  const { title, columns } = req.body;
  const board = await new Board({
    title,
    columns
  });
  await boardsService.update(req.params.id, Board.toResponse(board));
  res.json(board);
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  await boardsService.remove(id);
  res.sendStatus(200);
});

module.exports = router;
