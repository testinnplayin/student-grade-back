// This model is for defining the Student entity in the application
// Author: R.Wood
// Date: 20/1/18

'use strict';

const mongoose = require('mongoose');

// An example of a student:
// {
//   name : 'Jane Schmane',
//   studentId : '123456',
//   classes : ['fa0...cff1'],
//   grades: ['fa0...cfg3', 'fa0...cfg4']
// }

const studentSchema = mongoose.Schema({
  name : { type : String, required : true },
  studentId : String,
  classes : [{ type : mongoose.Schema.Types.ObjectId, ref : 'Klass' }],
  grades : [{ type : mongoose.Schema.Types.ObjectId, ref : 'Grade' }]
});

const Student = mongoose.model('Grade', studentSchema);

module.exports = { Student };
