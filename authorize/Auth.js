const express = require('express');
const router = express.Router();

module.exports = {
    ensureAuthenticated: function(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      res.send('error_msg', 'Please log in');
    }
  };
  