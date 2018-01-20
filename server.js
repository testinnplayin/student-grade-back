// This is the HTTP server file
// Author: R.Wood
// Date: 20/1/18

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

mongoose.Promise = global.Promise;

const {DATABASE_URL, PORT} = require('./config');

app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());

const klassRouter = require('./routes/classes');
// const gradeRouter = require('./routes/grade');
const studentRouter = require('./routes/students');

app.use('/classes', klassRouter);
app.use('/students', studentRouter);

app.use(morgan('common'));

app.use('*', (req, res) => {
  res.status(404).json({ message : 'Resource not found'});
});

let server;

function runServer(databaseUrl=DATABASE_URL, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
        console.log(`Database connected at ${databaseUrl}`);
        resolve();
      })
      .on('error', err => {
        console.error(err);
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}


function closeServer() {
  return mongoose.disconnect()
    .then(() => {
      return new Promise((resolve, reject) => {
        console.log('closing server');
        server.close(err => {
          if (err) {
            console.error(err);
            return reject(err);
          }
          resolve();
        });
      });
    });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer}
