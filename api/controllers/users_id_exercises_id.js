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
      res.send(result);
    })
    .catch((err) => {
      next();
    });

}


function patchUsersIdexercisesId(req, res) {

  knex('routines')
    .update({
      name: req.body.name,
      description: req.body.description,
      status: req.body.status
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

function deleteUsersIdexercisesId(req, res) {

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
