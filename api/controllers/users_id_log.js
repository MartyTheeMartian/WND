'use strict';

var util = require('util');
const knex = require('../../knex');


module.exports = {
  getUsersIdLog: getUsersIdLog,
  postUsersIdLog: postUsersIdLog
};

function getUsersIdLog(req, res) {

  knex('log')
    .where('users_id', req.swagger.params.users_id.value)
    .select('*')
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      next();
    });
}

function postUsersIdLog(req, res) {

  knex('log')
    .where('users_id', req.swagger.params.users_id.value)
    .insert({
      routines_id: req.swagger.params.routines_id.value,
      rating: req.swagger.params.rating.value,
      date: req.swagger.params.date.value,
      time: req.swagger.params.time.value
    },'*')
    .first()
    .then((result) => {
      res.send(results);
    })
    .catch((err) => {
      next();
    });
}
