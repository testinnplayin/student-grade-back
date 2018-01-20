// This router handles everything to do with the Class (or Klass) entity
// Author: R.Wood
// 20/1/08

'use strict';

const express = require('express');
const app = express();

const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
app.use(bodyParser.urlencoded({ extended : false }));

const {Klass} = require('../models/class');

const {checkRequiredFields, sendError} = require('../helpers/error-handlers');

// GET requests

// main get at /api/classes

router.get('/', (req, res) => {
 // console.log('classes hit');
 Klass
  .find()
  .exec()
  .then(klasses => {
    res.status(200).json({ classes : klasses });
  })
  .catch(err => sendError(err, res, 500, 'cannot fetch classes'));
});

// specific get at /classes/:id

router.get('/:id', (req, res) => {
 Klass
  .findById(req.params.id)
  // .populate({ path : 'students', path: 'grades' }) needs to be added in once some students have been created
  .exec()
  .then(klass => {
    res.status(200).json({ class : klass });
  })
  .catch(err => sendError(err, res, 500, `cannot fetch class of id ${req.params.id}`));
});

// POST requests

// post at /api/classes

router.post('/', jsonParser, (req, res) => {
  const reqFields = ['name'],
    reqStatus = checkRequiredFields(req, reqFields);

  if (!reqStatus.isOk) {
    sendError(err, res, 400, reqStatus.msg);
  }

  Klass
    .create(req.body)
    .then((klass) => {
      if (klass) res.status(201).json({ class : klass })
    })
    .catch((err) => sendError(err, res, 500, 'couldn\'t create class'));
});

module.exports = router;
