const mongoose = require('mongoose');

const collegeTest = mongoose.Schema({
    test: { type: mongoose.Schema.Types.ObjectId, ref: 'CustomizedQuestions', required: true },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true}],
    // durations : { type: Number, required: true },
    // onCreate: { type: Date, required: true},
    collegeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('CollegeTest', collegeTest);