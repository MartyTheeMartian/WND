'use strict';

var util = require('util');
const knex = require('../../knex');
const bodyParser = require('body-parser');


module.exports = {
  getUsersIdRoutinesId: getUsersIdRoutinesId,
  patchUsersIdRoutineId: patchUsersIdRoutineId,
  deleteUsersIdRoutineId: deleteUsersIdRoutineId
};

function getUsersIdRoutinesId(req, res) {

  knex('routines')
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


function patchUsersIdRoutineId(req, res) {

  // knex('routines')
  //   .update({
  //     weight: req.swagger.params.weight.value,
  //     date: req.swagger.params.date.value
  //   }, '*')
  //   .where('users_id', req.swagger.params.users_id.value)
  //   .andWhere('id', req.swagger.params.id.value)
  //   .then((result) => {
  //     res.send(result[0]);
  //   })
  //   .catch((err) => {
  //     res.status(400);
  //     res.send({status: 400, ErrorMessage: 'Bad Request. Invalid Inputs.'});
  //   });
  let result;
  let insertArray = [];
  let array = req.body.exercises;

  knex('routines')
    .update({
      users_id: req.swagger.params.users_id.value,
      name: req.body.name,
      description: req.body.description,
    }, '*')
    .where('users_id', req.swagger.params.users_id.value)
    .andWhere('id', req.swagger.params.id.value)
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

function deleteUsersIdRoutineId(req, res) {

  let routine;

  knex('routines')
    .where('users_id', req.swagger.params.users_id.value)
    .andWhere('id', req.swagger.params.id.value)
    .select('*')
    .first()
    .then((result) => {
      routine = result;
      return knex('routines')
        .del()
        .where('users_id', req.swagger.params.users_id.value)
        .andWhere('id', req.swagger.params.id.value);
    })
    .then(() => {
      if(routine) {
        res.send(routine);
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
