// This model is for defining the Class entity in the application
// Author: R. Wood
// Date: 20/1/18

'use strict';

const mongoose = require('mongoose');

// An example of a class (or klass):
// {
//  name : 'Chemistry 101',
//  subject : 'Chemistry',
//  category : 'Mathematics & Science',
//  students : ['fa0b....cfg2'],
//  grades : ['fa0b...cfgg'],
//  semester : 'SPRING',
//  year : 2016
// }

const klassSchema = mongoose.Schema({
  name : { type : String, required : true },
  subject : String,
  category : {
    type : String,
    enum : [
      'Art & Crafts',
      'Government & Politics',
      'History, Geography & Social Sciences',
      'Information Technology',
      'Languages & Litterature',
      'Mathematics & Science',
      'Other',
      'Philosophy',
      'Physical Education & Sports'
    ]
  },
  students: [{ type : mongoose.Schema.Types.ObjectId, ref : 'Student' }],
  grades : [{ type : mongoose.Schema.Types.ObjectId, ref : 'Grade' }],
  semester : { type : String, enum : ['SPRING', 'SUMMER', 'FALL'] },
  year : Number
});

const Klass = mongoose.model('Klass', klassSchema);

module.exports = { Klass };
