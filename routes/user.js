const express = require('express');
const router = express.Router();
const passport = require('../config/passport-local-strategy');

const user = require('../controllers/user');

router.get('/profile', passport.checkAuthentication, user.profile);
router.get('/contact', passport.checkAuthentication, user.contact);
router.get('/signup',user.signup);
router.get('/signin',user.signin);

router.post('/create',user.createUser);
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/user/signin'},
),user.createSession);


module.exports = router;