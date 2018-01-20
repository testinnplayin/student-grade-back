// This is the router that handles everything about students
// Author: R. Wood
// Date : 20/1/18

const express = require('express');
const app = express();
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
app.use(bodyParser.urlencoded({ extended : false }));

const {Student} = require('../models/student');

const {checkRequiredFields, sendError} = require('../helpers/error-handlers');

// GET requests

// get all students at /api/students

router.get('/', (req, res) => {
  Student
    .find()
    .exec()
    .then(students => res.status(200).json({ students : students }))
    .catch(err => sendError(err, res, 500, 'cannot fetch students'));
});

// get specific student at /api/students/:id

router.get('/:id', (req, res) => {
  Student
    .findById(req.params.id)
    .then(student => res.status(200).json({ student : student }))
    .catch(err => sendError(err, res, 500, `cannot fetch student of id ${req.params.id}`));
});
