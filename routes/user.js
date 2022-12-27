const express = require('express');
const router = express.Router();
const user = require('../controllers/user');

router.get('/', user.profile);
router.get('/contact', user.contact);
router.get('/signup',user.signup);
router.get('/signin',user.signin);

router.post('/create',user.createUser);
router.post('/createSession', user.createSession);
module.exports = router;