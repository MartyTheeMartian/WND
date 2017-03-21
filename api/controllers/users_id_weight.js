'use strict';

var util = require('util');
const knex = require('../../knex');


module.exports = {
  getUsersIdWeight: getUsersIdWeight,
  postUsersIdWeight: postUsersIdWeight
};

function getUsersIdWeight(req, res) {

  knex('weight')
    .where('users_id', req.swagger.params.users_id.value)
    .select('*')
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      next();
    });
}

function postUsersIdWeight(req, res) {

  knex('weight')
    .insert({
      users_id: req.swagger.params.users_id.value,
      weight: req.swagger.params.weight.value,
      date: req.swagger.params.date.value
    },'*')
    .first()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      next();
    });
}
