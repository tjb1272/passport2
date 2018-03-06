const express = require("express");
const router = express.Router();
const passport = require("passport");
const db = require("../models");
const { ensureAuthenticated } = require("../authorize/auth");
const expressValidator = require('express-validator');

const user = require('../models/User');

// Register
router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {
    db.User.create({
        username: 'username',
        password: 'password'
      }).then(user => {
        res.status(200).json({
          msg: ('success_msg', 'You have successfully created your account.'),
          user: user
        });
      });
    });

//Login
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
    successRedirect: ('/dash', ('success_msg', 'You have successfully logged in.')),
    failureRedirect: ('/login', ('error_msg', 'Login Incorrect, Please Re-try.')), 
    })(req, res, next);
});

//Home
router.get('/', (req, res) => {
    res.render('/home');
});

//Logout
router.get('/logout', (req, res) => {
    req.logOut();
    res.render('Logged out', ('success_msg', 'You have successfully logged out.'));
});

router.get("/protected", ensureAuthenticated, (req, res) => {
    res.render('success_msg', 'You have successfully logged out.');
});
  
module.exports = router;

