'use strict';

var SwaggerExpress = require('swagger-express-mw');
const express = require('express');
var app = require('express')();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const path = require('path');
const cors = require('cors');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

let condition = true;

// function tokenAuth(req, res, next) {
//   console.log(req.cookies);
//   if (req.cookies) {
//     jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
//       if (err) {
//         res.status(401);
//         res.send({status: 401, ErrorMessage: 'Unauthorized'});
//       }
//       else {
//         next();
//       }
//     });
//   }
//   else {
//     condition = false;
//     // res.status(401);
//     // res.send({status: 401, ErrorMessage: 'Unauthorized'});
//     next();
//   }
// }

app.use(express.static(path.join('public')));
app.use(cors());

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware2

  // app.use('/users', tokenAuth);

  if(condition) {
    swaggerExpress.register(app);
  }


  var port = process.env.PORT || 10000;
  app.listen(port);

});
