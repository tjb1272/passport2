const express = require('express');
const router = express.Router();

const user = require('../models/user');

//Register
router.get('/register', (req, res) => {
    res.render('register');
});

//Login
router.get('/login', (req, res) => {
    res.render('login');
});

//Register User
router.post('/register', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;

    //Validation
    req.checkBody('username', 'Username Is Required').notEmpty();
    req.checkBody('username', 'Username Is Email').isEmail();
    req.checkBody('password', 'Password Is Required').notEmpty();
    req.checkBody('password2', 'Password Does Not Match').equals(req.body.password);


//Passport
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user._id);
});
  
passport.deserializeUser((id, done) => {
    user.findById(user, (err, user) => {
        if (err || !user) return done(err, null);
        done(null, user);
    });
});

passport.use(new LocalStrategy({
    username: 'email',
    password: 'password',
    passReqToCallback: true,
    session: false
    },
function(req, username, password, done) {
    user.findOne({ username: username }, (err, user) => {
        if (err) { return done(err); }
        if (!user) {
            return done(null, false, ('error_msg', 'Username is incorrect'));
        }
        if (!user.validPassword(password)) {
            return done(null, false, ('error_msg', 'Password is incorrect'));
        }
            return done(null, user);
        })
        if(user == null) {
        user.create({
        username: username,
        password: password
        }).then((user) => {
            return done(null, user('success_msg', 'Your account has been successfully created.'));
        }).catch((err) => {
            return done(null, err('error_msg',));
        })
    }})
)});

module.exports = router;