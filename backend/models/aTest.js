const mongoose = require('mongoose');

const test = mongoose.Schema({
    test: { type: mongoose.Schema.Types.ObjectId, ref: 'AdminTest', required: true },
    // durations : { type: Number, required: true },
    // students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true}],
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true }
});

module.exports = mongoose.model('ATest', test);