require('dotenv').config();
const express = require('express');
const app = express();

const usersRouter = require('./routes/users');

//middleware

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use('/api/users',usersRouter);

app.listen(process.env.PORT, () => {
  console.log('Server listening on port ',process.env.PORT);
});

