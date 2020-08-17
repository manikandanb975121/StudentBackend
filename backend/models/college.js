const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    collegeName: {type: String, required: true, unique: true},
    placementCordinatorName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phoneNumber: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    imageUrl: {type: String },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('College', userSchema);