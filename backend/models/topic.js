const mongoose = require('mongoose');

// const questionScehma = mongoose.Schema({
//     title: { type: String},
//     optA: { type: String},
//     optB: { type: String},
//     optC: { type: String},
//     optD: { type: String},
//     ans: { type: String},
// })
const topicSchema = mongoose.Schema({
    title: { type: String, required: true},
    descriptions: {type: String, required: true},
    adminEnable: { type: Boolean},
    collegeEnable: { type: Boolean},
    questions: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Questions', required: true }]
});

module.exports = mongoose.model('Topic', topicSchema);