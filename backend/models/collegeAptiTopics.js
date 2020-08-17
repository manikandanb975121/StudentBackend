const mongoose = require('mongoose');

const collegeAptiTopics = mongoose.Schema({
    topic: { type: String, required: true},
    descriptions: { type: String, required: true},
    questionsID: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CollegeQuestions'}],
    collegeId: {type: mongoose.Schema.Types.ObjectId, ref: 'College', required: true}
});

module.exports = mongoose.model('CollegeAptiTopics', collegeAptiTopics);