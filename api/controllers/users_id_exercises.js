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

function postUsersIdExercises(req, res) {

  knex('exercises')
    .insert({
      users_id: req.swagger.params.users_id.value,
      name: req.body.name,
      description: req.body.description,
      status: req.body.status
    }, '*')
    .then((result) => {
      console.log(result);
      res.send(result[0]);
    })
    .catch((err) => {
      res.status(400);
      res.send({status: 400, ErrorMessage: 'Bad Request. Invalid Inputs.'});
    });

}
