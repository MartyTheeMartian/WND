'use strict';

var util = require('util');
const knex = require('../../knex');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-as-promised');
const express = require('express');
const router = express.Router();
const Joi = require('joi');
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
    .then((userCheck) => {
      // Validates email input
      let valid = Joi.validate(req.body.email, Joi.string().email());
      if(userCheck) {
        res.status(400);
        res.send({status: 400, ErrorMessage: 'Email already exists'});
      }
      else if (valid.error !== null) {
        res.status(400);
        res.send({status: 400, ErrorMessage: 'Improper email format'});
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
          })
          .then((users) => {

            const user = users[0];

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
          })
          .catch((err) => {
            res.status(400);
            res.send({status: 400, ErrorMessage: 'Invalid Email or password'});
          });
      }
    });

}
