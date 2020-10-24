const router = require('express').Router();
const User = require('./user.model');
const userService = require('./user.service');
const usersService = require('./user.service');
const errorGenerator = require('http-errors');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  if (users) {
    return res.status(200).send(users.map(User.toResponse));
  }
  return res.status(404).send('Not found13');
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const user = await usersService.get(req.params.id);
    if (!user) throw new errorGenerator.NotFound('User not found');
    return res.status(200).send(User.toResponse(user));
  } catch (error) {
    return next(error);
  }
});

router.route('/').post(async (req, res) => {
  const user = await userService.create(req.body);
  res.json(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const user = await new User(req.body);
  await userService.update(req.params.id, User.toResponse(user));
  if (user) {
    return res.status(200).send(User.toResponse(user));
  }
  return res.status(404).send('User not found');
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  const removeStatus = await usersService.remove(id);
  if (removeStatus) {
    return res.status(200).send(removeStatus);
  }
  return res.status(404).send('User not found');
});

module.exports = router;
