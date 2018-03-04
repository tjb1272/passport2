const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const Sequelize = require('sequelize'); 
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs')
const app = express();
const passport = require('passport');
const router = express.Router();


//Connection
const sequelize = new Sequelize('Music', 'tjb1272', null, {
  host: 'localhost',
  dialect: 'sqlite',
  storage: './Chinook_Sqlite_AutoIncrementPKs.sqlite'
});

//Model
const Users = sequelize.define(
    'users',
    {
      UserId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
        Username: Sequelize.STRING,
        Password: Sequelize.STRING,
        // Role: Sequelize.STRING,
      },
    {
      freezeTableName: true,
      timestamps: false
    }
  );
 
const Artist = sequelize.define(
  "Artist",
  {
    ArtistId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Name: Sequelize.STRING
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);

const Album = sequelize.define(
  "Album",
  {
    AlbumId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Title: Sequelize.STRING
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);

module.exports = router;