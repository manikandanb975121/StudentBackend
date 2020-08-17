const express = require('express');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

const aTest = require('../models/aTest');
const adminCustomizedQuestions = require('../models/adminCustomizedQuestions');
const adminTest = require('../models/adminTest');
const CompletedAdminTest = require('../models/completedAdminTest');

router.get('', checkAuth, (req, res, next) => {

    aTest.find()
        .populate({
            path: 'test',
            model: 'AdminTest',
            populate: {
                path: 'students',
                model: 'Student'
            }
        })
        .populate({
            path: 'test',
            model: 'AdminTest',
            populate: {
                path: 'test',
                model: 'AdminCustomizedQuestions',
                populate: {
                    path: 'questionID.questionsId',
                    model: 'Questions'
                }
            }
        })
        .then((response) => {
            console.log(response);
            res.status(200).json({
                message: 'Admin Test Details Fetched Successfully',
                result: response
            })
        });
});

router.post('/start/:testId', checkAuth, (req, res, next) => {
    console.log(req.params.testId);
    adminTest.findById(req.params.testId)
        .then(test => {
            test.students.push(req.userData.userId)
            test.save().then(documents => {
                res.status(200).json({
                    message: 'Student Added Successfully',
                    result: documents
                })
            });
        });
    
});

router.post('/close/:stestId/:testId', checkAuth, (req, res, next) => {

    adminTest.findById(req.params.stestId)
        .then(aTest => {
            // res.status(200).json({
            //     message: 'Admin test Fetched',
            //     result: aTest.students
            // })
            adminCustomizedQuestions.findById(req.params.testId)
                .then(test => {
                    
                    const completedAdminTest = new CompletedAdminTest({
                        title: test.title,
                        questionID: test.questionID,
                        maxmark: test.maxmark,
                        durations: test.durations,
                        status: 'completed',
                        startDate: test.startDate,
                        endDate: test.endDate,
                        highestScore: test.highestScore,
                        averageScore: test.averageScore,
                        leastScore: test.leastScore,
                        adminId: test.adminId,
                        students: aTest.students
                    });
                    completedAdminTest.save()
                        .then(tests => {
                            res.status(200).json({
                                message: 'test Fetched Successfully',
                                result: tests
        
                            });
                        });
            });

        });
});

module.exports = router;