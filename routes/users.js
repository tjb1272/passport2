const express = require('express');
const router = express.Router();
const passport = require('passport');
const db = require('../models');
const { ensureAuthenticated } = require('../authorize/auth');
    
// Register
router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {
    db.User.create({
        username: username,
        password: password
    }).then(user => {
        res.status(200).json({
        msg: 'You have successfully created your account.',
        user: user
    });
        console.log('registered')
    });
});

//Login
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/User/success', 
    failureRedirect: '/User/failure', 
}));

//Home
router.get('/dash', (req, res) => {
    res.render('dash');
    console.log('home');
});

//Logout
router.get('/logout', (req, res) => {
    res.render('logout');
});

router.post('/logout', (req, res) => {
    req.logOut();
    res.send('You have successfully logged out.');
    console.log('logged out');
});


//Failure
router.get('/failure', (req, res) => {
    res.send('Try to log in again.');
});

//Success
router.get('/success', (req, res, next) => {
    res.send(req.session.passport);
});

router.get('/protected', ensureAuthenticated, (req, res) => {
    res.send('You have successfully logged in.');
});

module.exports = router;
