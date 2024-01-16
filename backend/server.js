require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const usersRouter = require('./routes/users');

//connect to db

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
              console.log('Connected to MongoDB');
              app.listen(process.env.PORT, () => {
                console.log('Server listening on port ',process.env.PORT);
              });
              })
  .catch(err => console.log(err));

//middleware

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use('/api/users', usersRouter);



