'use strict';

var util = require('util');
const knex = require('../../knex');
const bodyParser = require('body-parser');


module.exports = {
  getUsersIdLog: getUsersIdLog,
  postUsersIdLog: postUsersIdLog
};

function getUsersIdLog(req, res) {

  knex('log')
    .where('users_id', req.swagger.params.users_id.value)
    .select('*')
    .then((results) => {
      if(results.length > 0) {
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
    .insert({
      users_id: req.swagger.params.users_id.value,
      routines_id: req.body.routines_id,
      rating: req.body.rating,
      notes: req.body.notes,
      date: req.body.date
    },'*')
    .then((result) => {
      res.send(result[0]);
    })
    .catch((err) => {
      res.status(400);
      res.send({status: 400, ErrorMessage: 'Bad Request. Invalid Inputs.'});
    });
}
