const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB Connection is good!');
  });

const port = 3000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(process.env.DATABASE);
  console.log(`App running on port:${port} `);
});
