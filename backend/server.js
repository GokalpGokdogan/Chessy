require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
// const cors = require('cors')
// const path = require('path')

// app.use(cors())
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

// serve frontend
// app.use(express.static(path.join(__dirname, './..'), {
//   setHeaders: (res, path) => {
//     if (path.endsWith('.jsx')) {
//       res.type('text/javascript');
//     }
//   }
// }))
// app.get('*', (req, res, next) => {
//   res.sendFile(
//     path.join(__dirname, './../index.html'),
//     function (err){
//       if (err) {
//         console.error('Error in frontend', err);
//         next(err); // Pass the error to the next middleware
//       }
//     }
//   )
// })

app.use(express.json());
app.use((req, res, next) => {
  // res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  // res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
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



