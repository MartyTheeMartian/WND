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
      if(result) {
        res.send(result);
      }
      else {
        throw new Error();
      }
    })
    .catch((err) => {
      res.status(404);
      res.send('Not Found');
    });
}

function postUsersIdRoutines(req, res) {

  knex('routines')
    .insert({
      users_id: req.swagger.params.users_id.value,
      name: req.body.name,
      description: req.body.description,
    }, '*')
    .first()
    .then((result) => {
      let array = req.body.exercises;
      for (let i = 0; i < array.length; i++) {
        knex('routines_exercises')
          .insert({
            routines_id: result.id,
            exercises_id: array[i],
            users_id: req.swagger.params.users_id.value
          });
      }
      res.send(result);
    })
    .catch((err) => {
      res.status(404);
      res.send('Not Found');
    });

}
