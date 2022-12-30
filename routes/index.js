const express = require('express');
const { appendFile } = require('fs');
const controller = require('../controllers/index');
const user = require('./user');//user routes
const friends = require('./friends');//friend routes
const post = require('./post');
//router helps us to separate routes and controller
const router = express.Router();

// console.log("router loaded");
router.get('/',controller.home);
router.use('/friends',friends);
router.use('/user', user);
router.use('/post',post);
module.exports = router;//external file can use it