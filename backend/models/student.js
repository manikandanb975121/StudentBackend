const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const student = mongoose.Schema({
    firstName: { type: String, required: true},
    lastName:  { type: String, required: true},
    mailId: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    college: { type: mongoose.Schema.Types.ObjectId, ref: 'College', required: true },
    contact: { type: Number, required: true },
    degree: { type: String, required: true},
    department: { type: String, required: true},
    graduatingYear: { type: String, required: true},
    profilePicture: { type: String, required: false},
    isVerified: { type: Boolean, default: false},
    practicedQuestions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Practice' }],
    // collegeTest: [ { type: mongoose.Schema.Types.ObjectId, ref: 'CollegeTest', required: true } ]
    testScore: {type: mongoose.Schema.Types.ObjectId, ref: 'TestScore'}
});

student.plugin(uniqueValidator);
module.exports = mongoose.model('Student', student);