const router = require('express').Router();
const User = require('./user.model');
const userService = require('./user.service');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  if (users) {
    return res.status(200).send(users);
  }
  return res.status(404).send('Not found');
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.get(req.params.id);
  if (user) {
    return res.status(200).send(user);
  }
  return res.status(404).send('The user not found!');
});

router.route('/').post(async (req, res) => {
  const user = await userService.create(
    new User({
      login: req.body.login,
      password: req.body.password,
      name: req.body.name
    })
  );
  res.json(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const user = await new User({
    login: req.body.login,
    password: req.body.password,
    name: req.body.name
  });
  await userService.update(req.params.id, User.toResponse(user));
  if (user) {
    return res.status(200).send(user);
  }
  return res.status(404).send('Not found');
});

router.route('/:id').delete(async (req, res) => {
  const removeStatus = await usersService.remove(req.params.id);
  if (removeStatus) {
    return res.status(200).send(removeStatus);
  }
  return res.status(404).send('Not found');
});

module.exports = router;
