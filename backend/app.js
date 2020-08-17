const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();

const student = require('./routes/student');
const practice = require('./routes/practice');
// const customizedTest = require('./routes/collegeCustomizedTest');
const cTest = require('./routes/cTest');
const aTest = require('./routes/aTest');

mongoose.connect('mongodb+srv://ManikandanB:OgzwjscbQzdgmt3d@cluster0-yjvaj.mongodb.net/Admin-Dashboard?retryWrites=true&w=majority', {useNewUrlParser: true,  useUnifiedTopology: true})
.then(() => {
    console.log('Connected to database!');
})
.catch(() => {
    console.log('Connection failed!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});


app.use('/api/student', student);
app.use('/api/practice', practice);
// app.use('/api/customized', customizedTest);
app.use('/api/cTest', cTest);
app.use('/api/aTest', aTest);

module.exports = app;