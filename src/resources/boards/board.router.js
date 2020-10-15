const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  if (boards) {
    return res.status(200).send(boards);
  }
  return res.status(404).send('Not found');
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
  if (board) {
    return res.status(200).send(board);
  }
  return res.status(404).send('Not found');
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
