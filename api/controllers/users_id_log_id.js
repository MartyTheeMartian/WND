'use strict';

var util = require('util');
const knex = require('../../knex');


module.exports = {
  getUsersIdLogId: getUsersIdLogId,
  patchUsersIdLogId: patchUsersIdLogId,
  deleteUsersIdLogId: deleteUsersIdLogId
};

function getUsersIdLogId(req, res) {

  knex('log')
    .where('users_id', req.swagger.params.users_id.value)
    .andWhere('id', req.swagger.params.id.value)
    .select('*')
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

function patchUsersIdLogId(req, res) {

  knex('log')
    .update({
      routines_id: req.swagger.params.routines_id.value,
      rating: req.swagger.params.rating.value,
      date: req.swagger.params.date.value,
      time: req.swagger.params.time.value
    }, '*')
    .where('users_id', req.swagger.params.users_id.value)
    .andWhere('id', req.swagger.params.id.value)
    .first()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      res.status(400);
      res.send({status: 400, ErrorMessage: 'Bad Request. Invalid Inputs.'});
    });

}

function deleteUsersIdLogId(req, res) {

  knex('log')
    .where('users_id', req.swagger.params.users_id.value)
    .andWhere('id', req.swagger.params.id.value)
    .select('*')
    .first()
    .then((result) => {
      knex('log')
        .where('users_id', req.swagger.params.users_id.value)
        .andWhere('id', req.swagger.params.id.value)
        .select('*')
        .first()
        .del();
      res.send(result)
    })
    .catch((err) => {
      res.status(404);
      res.send({status: 404, ErrorMessage: 'Not Found'});
    });

}
