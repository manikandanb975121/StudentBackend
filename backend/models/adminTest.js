const mongoose = require('mongoose');

const adminTest = mongoose.Schema({
    test: { type: mongoose.Schema.Types.ObjectId, ref: 'AdminCustomizedQuestions', required: true },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true}],
    // durations : { type: Number, required: true },
    // onCreate: { type: Date, required: true},
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true }
});

module.exports = mongoose.model('AdminTest', adminTest);