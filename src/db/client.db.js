const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');

const { usersData } = require('../resources/users/user.db.repository');

function connectToDB(fn) {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('DB connected!');
    db.dropDatabase();
    usersData.forEach(user => user.save());
    fn();
  });
}
module.exports = { connectToDB };
