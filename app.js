'use strict';

var SwaggerExpress = require('swagger-express-mw');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const path = require('path');
const cors = require('cors');
const knex = require('./knex.js');
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
  console.log(req.headers['token']);
  jwt.verify(req.headers['token'], process.env.JWT_KEY, (err, payload) => {
    if (err) {
      auth = false;
      res.status(401);
      res.send({status: 401, ErrorMessage: 'Unauthorized'});
    }
    else {
      auth = true;
      next();
    }
  });
}

// Checks if user has admin authorization
function adminCheck(res, req, next) {
  console.log('check');
  knex('users')
    .where('users_id', req.swagger.params.users_id.value)
    .andWhere('status', 1)
    .first()
    .then((match) => {
      if(match) {
        admin = true;
        next();
      }
    })
    .catch((err) => {
      admin = false;
      res.status(401);
      res.send({status: 401, ErrorMessage: 'Unauthorized'});
    });
}

app.use(express.static(path.join('public')));
app.use(cors());


app.use('api/users/', tokenAuth);

// If not admin, then must verify path with id
if(admin === false) {
  app.use('api/users/:id', tokenAuth);
}

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }


  // install middleware2

  if(auth) {
    console.log('thing');
    swaggerExpress.register(app);
  }

  var port = process.env.PORT || 10000;
  app.listen(port);

});
