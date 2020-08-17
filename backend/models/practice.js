const mongoose = require('mongoose');

const practiceScehma = mongoose.Schema({
    question: { type: mongoose.Schema.Types.ObjectId, ref: 'Questions', required: true },
    title: { type: String, required: true}
});

module.exports = mongoose.model('Practice', practiceScehma);