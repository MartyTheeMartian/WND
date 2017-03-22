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

  knex('routines')
    .update({
      weight: req.swagger.params.weight.value,
      date: req.swagger.params.date.value
    }, '*')
    .where('users_id', req.swagger.params.users_id.value)
    .andWhere('id', req.swagger.params.id.value)
    .first()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      next();
    });

}

function deleteUsersIdRoutineId(req, res) {

  knex('routines')
    .where('users_id', req.swagger.params.users_id.value)
    .andWhere('id', req.swagger.params.id.value)
    .first()
    .then((result) => {
      knex('routines')
        .where('users_id', req.swagger.params.users_id.value)
        .andWhere('id', req.swagger.params.id.value)
        .first()
        .del();
      res.send(result);
    })
    .catch((err) => {
      next();
    });

}
