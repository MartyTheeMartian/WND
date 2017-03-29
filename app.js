'use strict';

var SwaggerExpress = require('swagger-express-mw');
const express = require('express');
var app = require('express')();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const path = require('path');
const cors = require('cors');
const knex = require('knex.js');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};


let auth = true;
let admin = false;

// Checks for token authorization
function tokenAuth(res, req, next) {
  jwt.verify(req.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      auth = false;
      res.status(401);
      res.send({status: 401, ErrorMessage: 'Unauthorized'});
    }
    else {
      if(req.params.id === payload.users_id) {
        auth = true;
        next();
      }
      else {
        auth = false;
        res.status(401);
        res.send({status: 401, ErrorMessage: 'Unauthorized'});
      }
    }
  });
}

// Checks if user has admin authorization
function adminCheck(res, req, next) {
  knex('users')
    .where('users_id', req.swagger.params.users_id.value)
    .andWhere('status', 1)
    .first()
    .then((match) => {
      if(match) {
        next();
      }
    })
    .catch((err) => {
      admin = true;
      res.status(401);
      res.send({status: 401, ErrorMessage: 'Unauthorized'});
    });
}

app.use(express.static(path.join('public')));
app.use(cors());

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware2

  app.use('/users', adminCheck);

  // If not admin, then must verify path with id
  if(admin === false) {
    app.use('/users/:id', tokenAuth);
  }

  if(auth) {
    swaggerExpress.register(app);
  }

  var port = process.env.PORT || 10000;
  app.listen(port);

});
