const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const CustomizedQuestions = require('../models/collegeCustomizedQuestions');
const CollegeTest = require('../models/collegeTest');
const CollegeQuestions = require('../models/collegeQuestions');
const cTest = require('../models/cTest');
const CompletedCollegeTest = require('../models/completedCollegeTest');
// const { restart } = require('nodemon');

router.get('', checkAuth, (req, res, next) => {
    cTest.find({ creatorId: req.userData.collegeId })
        .populate({
            path: 'test',
            model: 'CollegeTest',
            populate: {
                path: 'students',
                model: 'Student'
            }
        })
        .populate({
            path: 'test',
            populate: {
                path: 'test',
                model: 'CustomizedQuestions',
                populate: {
                    path: 'questionID.questionsId',
                    model: 'Questions'   
                }
            }
        })
        .populate({
            path: 'test',
            model: 'CollegeTest',
            populate: {
                path: 'test',
                model: 'CustomizedQuestions',
                populate: {
                    path: 'collegeQuestionID.questionsId',
                    model: 'CollegeQuestions'   
                } 
            }
        })
        .then(doc => {
            res.status(200).json({
                message: 'College Test Fetched Successfully',
                result: doc
            });
        });
});

router.post('/start/:testId', checkAuth, (req, res, next) => {
    console.log(req.params.testId);
    CollegeTest.findById(req.params.testId)
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

    CollegeTest.findById(req.params.stestId)
        .then(aTest => {
            // res.status(200).json({
            //     message: 'Admin test Fetched',
            //     result: aTest.students
            // })
            CustomizedQuestions.findById(req.params.testId)
                .then(test => {
                    
                    const completedCollegeTest = new CompletedCollegeTest({
                        title: test.title,
                        questionID: test.questionID,
                        collegeQuestionID: test.collegeQuestionID,
                        maxmark: test.maxmark,
                        durations: test.durations,
                        status: 'completed',
                        startDate: test.startDate,
                        endDate: test.endDate,
                        highestScore: test.highestScore,
                        averageScore: test.averageScore,
                        leastScore: test.leastScore,
                        collegeId: test.collegeId,
                        students: aTest.students
                    });
                    completedCollegeTest.save()
                        .then(tests => {
                            res.status(200).json({
                                message: 'Colleget Test Fetched Successfully',
                                result: tests
        
                            });
                        });
            });

        });
});

module.exports = router;