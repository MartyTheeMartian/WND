'use strict';

var util = require('util');
const knex = require('../../knex');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-as-promised');
const express = require('express');
const router = express.Router();
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}


module.exports = {
  usersLogin: usersLogin
};

function usersLogin(req, res) {

  let user;

  knex('users')
    .where({
      email: req.body.email
    })
    .first()
    .then((userResult) => {
      user = userResult;
      return bcrypt.compare(req.body.password, user.hashed_password);
    })
    .then((match) => {
      if(match) {
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
        user.token = token;
        res.send(user);
      }
    })
    .catch((err) => {
      res.status(400)
      res.send({status: 400, ErrorMessage: 'Bad email or password'});
    });

}
