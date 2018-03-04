const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars').create({ defaultLayout: 'main' });
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./Chinook_Sqlite_AutoIncrementPKs.sqlite');
const Sequelize = require('sequelize');

var routes = require('./routes/index');
var users = require('./routes/users');
var user = require('../models/user');

//Engines
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);

//BodyParsers
app.use(bodyParser.json());
app.use(require('connect-multiparty')());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

//Express Session
app.use(session({ secret: 'secret' }));

//Passport Init
app.use(passport.initialize());
app.use(passport.session());



//Header
// var http = require('http');
// var options = { method: 'HEAD', port: 3000, path: '/' };
// var req = http.request(options, function(res) {
//   console.log(res.headers);
// });
// req.end();

//Connect Flash
app.use(flash());

//Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('err');
  next();
});



Artist.hasMany(Album, { foreignKey: "ArtistId" });
Album.belongsTo(Artist, { foreignKey: "ArtistId" });

app.get('/album', (request, response) => {
  response.header({
    DBnumber: 01,
    Music: true
  });
  if (request.header('music-request') === 'album-artist') {
    Album.findAll({
      include: [
        {
          model: Artist
        }
      ]
    }).then(albumArtist => {
      response.json(albumArtist);
    });
  } else if (request.header('music-request') === 'album') {
    Album.findAll().then(albums => {
      response.json(albums);
    });
  }
});

//routes
app.use('/', routes);
app.use('/users', users);

app.use((req, res) => {
  res.status(400);
  res.render('404');
});

app.listen(3000, () => {
  console.log('server running')
});