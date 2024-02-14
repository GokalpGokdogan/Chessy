require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const usersRouter = require('./routes/users');
const aiRouter = require('./routes/ai');
// const fishRouter = require('./routes/fish');

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

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.use('/api/users', usersRouter);
app.use('/api/ai', aiRouter);
// app.use('/api/fish', fishRouter);



