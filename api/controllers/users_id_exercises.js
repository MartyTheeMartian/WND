'use strict';

var util = require('util');
const knex = require('../../knex');
const bodyParser = require('body-parser');


module.exports = {
  getUsersIdExercises: getUsersIdExercises,
  postUsersIdExercises: postUsersIdExercises
};

function getUsersIdExercises(req, res) {

  knex('exercises')
    .where('users_id', req.swagger.params.users_id.value)
    .select('*')
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      next();
    });
}

function postUsersIdExercises(req, res) {

  knex('exercises')
    .insert({
      users_id: req.swagger.params.users_id.value,
      name: req.body.name,
      description: req.body.description,
      status: req.body.status
    }, '*')
    .first()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      next();
    });

}
