const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const customizedTest = require('../models/collegeCustomizedQuestions');

router.get('', checkAuth, (req, res, next) => {
    customizedTest.find()
    .populate({
        path: 'questionID',
        populate: {
            path: 'questionsId',
            model: 'Questions'
        }
    })
    .then(doc => {
        res.status(200).json({
            message: 'Customzied Fetched',
            result: doc
        });
    });
});
module.exports = router;