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


app.use(express.static(path.join('public')));
app.use(cors());

// Authorization middleware
app.use('api/users/:id', (req, res, next) => {
  console.log(req.headers.token);
  jwt.verify(req.headers.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      auth = false;
      res.status(401);
      res.send({status: 401, ErrorMessage: 'Unauthorized'});
    }
    else {
      knex('users')
        .where('id', payload.userId)
        .andWhere('status', 1)  // Checks for admin rights
        .first()
        .then((admin) => {
          if(admin) {
            next();
          }
          else if (req.params.id == payload.userId) {
            next();
          }
          else {
            res.status(401);
            res.send({status: 401, ErrorMessage: 'Unauthorized'});
          }
        })
        .catch((err) => {
          res.status(401);
          res.send({status: 401, ErrorMessage: 'Unauthorized'});
        });
    }
  });
});


SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware2
  swaggerExpress.register(app);


  var port = process.env.PORT || 10000;
  app.listen(port);

});
