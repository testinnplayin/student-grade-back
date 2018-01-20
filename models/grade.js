// This model is for defining the Grade entity in the application
// Author : R.Wood
// Date: 20/1/18

'use strict';

const mongoose = require('mongoose');

// An example of a grade:
// {
//   work : 'Exam 1',
//   type : 'Exam',
//   score : 75,
//   student : 'fa0...cfg2',
//   class: 'fa0...cff1'
// }

const gradeSchema = mongoose.Schema({
  work : { type : String, required : true },
  type : {
    type : String,
    enum : ['Exam', 'Homework', 'Mock Exam', 'Other', 'Report', 'Quiz']
  },
  student : { type : mongoose.Schema.Types.ObjectId, ref : 'Student'},
  class : { type : mongoose.Schema.Types.ObjectId, ref : 'Klass' }
});

const Grade = mongoose.model('Grade', gradeSchema);

module.exports = { Grade };
