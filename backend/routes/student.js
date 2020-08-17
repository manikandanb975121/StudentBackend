const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Student = require('../models/student');
const College = require('../models/college');

// const checkAuth = require('../middleware/check-auth');

// const users = require('../models/users');

// const collegeTest = require('../models/collegeTest');

const router = express.Router();


// const Student = require('../models/student');

router.post('/signup', (req, res, next) => {
    console.log(req.body);
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const student = new Student({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            mailId: req.body.mailId,
            password: hash,
            college: req.body.collegeId,
            contact: req.body.contact,
            degree: req.body.degree,
            department: req.body.department,
            profilePicture: '',
            graduatingYear: req.body.graduatingYear,
        });
        student.save()
        .then(result => {
            College.findById({ _id: req.body.collegeId}).then(user => {
                console.log(user);
                user.students.push(result._id);
                user.save();

            });
            res.status(201).json({
                message: 'Student Created',
                result: result
            });

        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
    });
});


router.post('/login', (req, res, next) => {
    console.log(req.body);
    let fetchUser;
    Student.findOne({ mailId: req.body.email })
    .then(user => {
        console.log(user)
        if (!user) {
            return res.status(401).json({
                message: 'Auth Failed !'
            });
        }
        fetchUser = user;
        console.log(fetchUser);
        return bcrypt.compare(req.body.password, user.password)
    })
    .then(result => {
        if (!result) {
            return res.status(401).json({
                message: 'Auth Failed!'
            });
        }
        const token = jwt.sign({email: fetchUser.mailId, userId: fetchUser._id, collegeId: fetchUser.college},
            'secret_this_should_be_longer',
            { expiresIn: '1h'}
        );
        res.status(200).json({
            token: token,
            expiresIn: 3600,
            userId: fetchUser._id
        });
    })
    .catch(err => {
        return res.status(401).json({
            message: 'Auth Failed !'
        });
    });
});


// router.get('',checkAuth, (req, res, next) => {
//     Student.find({ college: req.userData.userId}).then(student => {
//         res.status(200).json({
//             message: 'Student Fetched Successfully',
//             student: student
//         });
//     });
// });

// router.delete('/:studentId', checkAuth, (req, res, next) => {
//     console.log(req.params.studentId);
//     Student.deleteOne( {_id: req.params.studentId}).then(result => {
//         users.findById({ _id: req.userData.userId}).then(college => {
//             college.students.pull({ _id: req.params.studentId});
//             college.save();
//         });
//         res.status(200).json({
//            message: 'Student deleted Suceessfully' 
//         });
//     });
// });

// router.get('/:studentId', checkAuth, (req, res, next) => {
//     console.log(req.params.studentId);
//     Student.findById({ _id: req.params.studentId})
//     .then(result => {
//         console.log(result);
//         res.status(200).json({
//             message: 'Student Profile fetched !',
//             result: result
//         })
//     })
// });

// router.post('/add', (req, res, next) => {
//     console.log(req.body);
//     collegeTest.findById({_id: req.body.id}).then(response => {
//         console.log(response);
//         console.log(response.students)
//         response.students.push(req.body.studentId);
//         response.save();
//     })
//     res.status(200).json({
//         message: 'Student Added!'
//     })
// }); 

module.exports = router;