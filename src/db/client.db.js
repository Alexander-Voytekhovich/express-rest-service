const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');

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
    // db.dropDatabase();
    fn();
  });
}
module.exports = { connectToDB };
