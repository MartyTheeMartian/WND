'use strict';

var util = require('util');
const knex = require('../../knex');


module.exports = {
  getUsersIdRoutinesExercises: getUsersIdRoutinesExercises
};

function getUsersIdRoutinesExercises(req, res) {

  knex('routines_exercises')
    .where('users_id', req.swagger.params.users_id.value)
    .select('*')
    .then((result) => {
      if(result.length !== 0) {
        res.send(result);
      }
      else {
        throw new Error();
      }
    })
    .catch((err) => {
      res.status(204);
      res.send();
    });
}
