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
      if(results) {
        res.send(results);
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

function postUsersIdLog(req, res) {

  knex('log')
    .where('users_id', req.swagger.params.users_id.value)
    .insert({
      routines_id: req.body.routines_id,
      rating: req.body.rating,
      date_time: req.body.date_time,
    },'*')
    .first()
    .then((result) => {
      res.send(results);
    })
    .catch((err) => {
      res.status(400);
      res.send({status: 400, ErrorMessage: 'Bad Request. Invalid Inputs.'});
    });
}
