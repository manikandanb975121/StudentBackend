const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth'); 
const Practice = require('../models/practice');
const Questions = require('../models/questions');

router.get('', checkAuth, (req, res, next) => {
    console.log(req.userData);
    Practice.find()
        // .populate({
        //     path: 'question',
        //     populate: {
        //         path:
        //     }
        // })
        .populate('question')
        .then(documents => {
            console.log(documents);
            res.status(200).json({
                message: 'Practice Questions Fetched !',
                result: documents
            });
        });
});



module.exports = router;