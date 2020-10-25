const router = require('express').Router();

router.route('*').get((req, res, next) => {
  next({
    status: 404,
    message: 'Page not found!'
  });
});

module.exports = router;
