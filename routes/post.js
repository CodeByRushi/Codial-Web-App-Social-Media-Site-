const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');
const passport = require('../config/passport-local-strategy');


router.post('/create-post',passport.checkAuthentication ,postController.createPost);

module.exports = router;