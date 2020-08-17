const mongoose = require('mongoose');
const { stringify } = require('querystring');



const adminCustomizedQuestions = mongoose.Schema({
    title: {type: String, required: true},
    questionID: [
        {
            questionsId: {type: mongoose.Schema.Types.ObjectId, ref: 'Questions', required: true},
            score: {type: Number, require: true}
        }
    ],
    maxmark : { type: Number, required: true},
    durations : { type: Number, required: true },
    status: { type: String, required: true},
    startDate: {type: String},
    endDate: {type: String},
    highestScore: {type: Number, default: 0},
    averageScore: {type: Number, default: 0},
    leastScore: {type: Number, default: 99999},
    adminId: {type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true},
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true}],
});

module.exports = mongoose.model('CompletedAdminTest', adminCustomizedQuestions);