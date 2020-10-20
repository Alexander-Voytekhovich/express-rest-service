const { PORT } = require('./common/config');
const app = require('./app');
const { connectToDB } = require('./db/client.db');

connectToDB();

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
