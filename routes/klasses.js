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

const {send404, send500} = require('../helpers/error-handlers');

 // GET requests

 // main get at /api/get

 router.get('/', (req, res) => {
   Klass
    .find()
    .exec()
    .then(klasses => {
      if (!klasses) {
        send404(req, res);
      }
      res.status(200).json({ classes : klasses });
    })
    .catch(err => send500(req, res, err, 'cannot fetch classes'));
 });

 module.exports = router;
