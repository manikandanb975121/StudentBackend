const mongoose = require('mongoose');

const questionScehma = mongoose.Schema({
    //_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Topic'},
    title: { type: String},
    optA: { type: String},
    optB: { type: String},
    optC: { type: String},
    optD: { type: String},
    ans: { type: String},
    topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic', required: true}
});

module.exports = mongoose.model('Questions', questionScehma);