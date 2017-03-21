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
      return bcrypt.compare(req.body.password, user.password);
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
        delete user.hashed_password;
        res.send(user);
      }
    })
    .catch((err) => {
      res.set('Content-Type', 'text/plain');
      res.status(400).send('Bad email or password');
    });

}
