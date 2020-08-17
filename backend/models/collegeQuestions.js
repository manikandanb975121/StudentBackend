const mongoose = require('mongoose');

const collegeQuestion = mongoose.Schema({
    title: { type: String, required: true},
    optA: { type: String, required: true},
    optB: { type: String, required: true},
    optC: { type: String, required: true},
    optD: { type: String, required: true},
    ans: { type: String, required: true},
    topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'CollegeAptiTopics', required: true},
    collegeId: {type: mongoose.Schema.Types.ObjectId, ref: 'College', required: true}
});

module.exports = mongoose.model('CollegeQuestions', collegeQuestion);