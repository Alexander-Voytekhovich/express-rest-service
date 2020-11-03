const User = require('../users/user.model');

const get = async user => await User.findOne({ login: user.login });

module.exports = { get };
