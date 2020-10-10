const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards.map(Board.toResponse));
});

router.route('/').post(async (req, res) => {
  const board = await boardsService.create(
    new Board({
      title: req.body.title,
      columns: req.body.columns
    })
  );
  res.json(board);
});

router.route('/:id').get(async (req, res) => {
  const board = await boardsService.get(req.params.id);
  // map user fields to exclude secret fields like "password"
  res.json(board);
});

router.route('/:id').put(async (req, res) => {
  const board = await new Board({
    title: req.body.title,
    columns: req.body.columns
  });
  await boardsService.update(req.params.id, Board.toResponse(board));
  res.json(board);
});

router.route('/:id').delete(async (req, res) => {
  await boardsService.remove(req.params.id);
  res.sendStatus(200);
});

module.exports = router;
