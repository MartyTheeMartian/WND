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
      res.send({status: 404, ErrorMessage: 'Not Found'});
    });
}

function postUsersIdRoutines(req, res) {
  let result;
  let insertArray = [];
  let array = req.body.exercises;

  knex('routines')
    .insert({
      users_id: req.swagger.params.users_id.value,
      name: req.body.name,
      description: req.body.description,
    }, '*')
    .then((results) => {
      result = results[0];
      for (let i = 0; i < array.length; i++) {
        let temp = {
          routines_id: results[0].id,
          exercises_id: array[i],
          users_id: req.swagger.params.users_id.value
        };
        insertArray.push(temp);
      }
    })
    .then(() => {
      return knex('routines_exercises')
        .insert(insertArray, '*');
    })
    .then(() => {
      res.send(result);
    })
    .catch((err) => {
      res.status(400);
      res.send({status: 400, ErrorMessage: 'Bad Request. Invalid Inputs.'});
    });

}
