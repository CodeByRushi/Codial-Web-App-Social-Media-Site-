const express = require('express');
const { appendFile } = require('fs');
const controller = require('../controllers/index');
const user = require('./user');

//router helps us to separate routes and controller
const router = express.Router();

// console.log("router loaded");
router.get('/',controller.home);

router.use('/user', user);
module.exports = router;//external file can use it



