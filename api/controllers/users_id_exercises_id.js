'use strict';

var util = require('util');
const knex = require('../../knex');
const bodyParser = require('body-parser');

module.exports = {
  getUsersIdexercisesId: getUsersIdexercisesId,
  patchUsersIdexercisesId: patchUsersIdexercisesId,
  deleteUsersIdexercisesId: deleteUsersIdexercisesId
};

function getUsersIdexercisesId(req, res) {

  knex('exercises')
    .where('users_id', req.swagger.params.users_id.value)
    .andWhere('id', req.swagger.params.id.value)
    .first()
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


function patchUsersIdexercisesId(req, res) {

  knex('exercises')
    .update({
      name: req.body.name,
      description: req.body.description,
      status: req.body.status
    }, '*')
    .where('users_id', req.swagger.params.users_id.value)
    .andWhere('id', req.swagger.params.id.value)
    .then((result) => {
      res.send(result[0]);
    })
    .catch((err) => {
      res.status(400);
      res.send({status: 400, ErrorMessage: 'Bad Request. Invalid Inputs.'})
    });

}

function deleteUsersIdexercisesId(req, res) {

  let exercise;

  knex('exercises')
    .where('users_id', req.swagger.params.users_id.value)
    .andWhere('id', req.swagger.params.id.value)
    .select('*')
    .first()
    .then((result) => {
      exercise = result;
      return knex('exercises')
        .del()
        .where('users_id', req.swagger.params.users_id.value)
        .andWhere('id', req.swagger.params.id.value);
    })
    .then(() => {
      if(exercise) {
        res.send(exercise);
      }
      else {
        throw new Error();
      }
    })
    .catch((err) => {
      res.status(404);
      res.send({status: 404, ErrorMessage: 'Not Found.'});
    });

}
