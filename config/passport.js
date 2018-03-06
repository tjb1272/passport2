const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const user = require('../models').user;
  
module.exports = ((passport) => {
    passport.use(
      new LocalStrategy((username, password, done) => {
        user.find({ where: { username: username } })
          .then(user => {
            if (!user) {
              console.log('No Username');
              return done(null, false, ('error_msg', 'Username is incorrect'));
            }
            bcrypt.compare(password, user.password).then(res => {
              if (res) {
                console.log('Password is correct');
                console.log(user);
                return done(null, user);
              } else {
                console.log('Password is incorrect');
                return done(null, false, ('error_msg', 'Password is incorrect'));
              }
            });
          })
        .catch();
    })
);

passport.serializeUser((user, done) => {
    console.log(user.dataValues.id);
    done(null, user.dataValues.id);
});
  
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            if (user) {
            done(null, user);
            } else {
        done(null, false);
            }
        })
        .catch(err => done (err, false));
    });
});
