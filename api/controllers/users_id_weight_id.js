'use strict';

var util = require('util');
const knex = require('../../knex');


module.exports = {
  getUsersIdWeightId: getUsersIdWeightId,
  patchUsersIdWeightId: patchUsersIdWeightId,
  deleteUsersIdWeightId: deleteUsersIdWeightId
};

function getUsersIdWeightId(req, res) {

  knex('weight')
    .where('users_id', req.swagger.params.users_id.value)
    .andWhere('id', req.swagger.params.id.value)
    .select('*')
    .first()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      next();
    });

}

function patchUsersIdWeightId(req, res) {

  knex('weight')
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

function deleteUsersIdWeightId(req, res) {

  knex('weight')
    .where('users_id', req.swagger.params.users_id.value)
    .andWhere('id', req.swagger.params.id.value)
    .select('*')
    .first()
    .then((result) => {
      knex('weight')
        .where('users_id', req.swagger.params.users_id.value)
        .andWhere('id', req.swagger.params.id.value)
        .select('*')
        .first()
        .del();
      res.send(result);
    })
    .catch((err) => {
      next();
    });

}
