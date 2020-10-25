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
  return res.status(404).send('Users not found');
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

router.route('/:id').delete(async (req, res, next) => {
  const { id } = req.params;
  try {
    await usersService.remove(id);
    res.status(200).send('User deleted!');
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
