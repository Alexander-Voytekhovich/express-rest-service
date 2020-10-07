const router = require('express').Router();
const User = require('./column.model');
const columnsService = require('./column.service');

router.route('/').get(async (req, res) => {
  const columns = await columnsService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(columns.map(User.toResponse));
});

module.exports = router;
