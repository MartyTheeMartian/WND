'use strict';

var util = require('util');
const knex = require('../../knex');
const bodyParser = require('body-parser');


module.exports = {
  usersSignup: usersSignup
};

function usersSignup(req, res) {

  knex('users')
    .insert({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      weight: req.body.weight,
      email: req.body.email,
      password:
    }, '*')
    .first()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      next();
    });

}
