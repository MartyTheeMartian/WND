'use strict';

var util = require('util');
const knex = require('../../knex');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-as-promised');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

module.exports = {
  usersSignup: usersSignup
};

function usersSignup(req, res) {

  const password = req.body.password;

  knex('users')
  .where('email', req.body.email)
  .first()
  .then((user) => {
    if(user) {
      res.set('Content-Type', 'text/plain');
      res.status(400).send('Email already exists');
    }
    else {
      bcrypt.hash(password, 12)
        .then((hashed_password) => {
          return knex('users')
            .insert({
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              weight: req.body.weight,
              email: req.body.email,
              hashed_password: hashed_password
            }, '*')
            .first()
        })
        .then((user) => {

          const claim = { userId: user.id };
          const token = jwt.sign(claim, process.env.JWT_KEY, {
            expiresIn: '7 days'
          });
          res.cookie('token', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
            secure: router.get('env') === 'test'
          });
          delete user.status;
          delete user.hashed_password;
          res.send(user);
        })
        .catch((err) => {
          res.set('Content-Type', 'text/plain');
          res.status(400).send('Invalid Email or password');
        });
    }
  });

}
