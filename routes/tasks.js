const express = require('express');
const router = express.Router();
const auth = require('./middleware/authenticate');
const Task = require('../models/Tasks');

router.get('/list', (req, res, next) => {

})
router.post('/addTask', (req, res, next) => {

})
router.post('/update/addTask', (req, res, next) => {

})
router.post('/update/removeTask', (req, res, next) => {


})

router.post('/update/toggleTask', (req, res, next) => {

})

router.post('/update/changeStatus', (req, res, next) => {

})
module.exports = router;