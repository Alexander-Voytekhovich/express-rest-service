const router = require('express').Router();
const errorGenerator = require('http-errors');
const { verifyUser } = require('./login.service');

router.route('/').post(async (req, res, next) => {
  try {
    const token = await verifyUser(req.body);
    if (!token) {
      throw new errorGenerator.Forbidden('Forbidden: user not found in DB!');
    }
    return res.status(200).json({ token });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
