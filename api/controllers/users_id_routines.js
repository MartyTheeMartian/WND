'use strict';

var util = require('util');
const knex = require('../../knex');
const bodyParser = require('body-parser');


module.exports = {
  getUsersIdRoutines: getUsersIdRoutines,
  postUsersIdRoutines: postUsersIdRoutines
};

function getUsersIdRoutines(req, res) {

  knex('routines')
    .where('users_id', req.swagger.params.users_id.value)
    .select('*')
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      next();
    });
}

function postUsersIdRoutines(req, res) {

  knex('routines')
    .insert({
      users_id: req.swagger.params.users_id.value,
      routines_id: req.swagger.params.routines_id.value
    }, '*')
    .first()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      next();
    });

}
