'use strict';

var util = require('util');
const knex = require('../../knex');
const bodyParser = require('body-parser');

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
      routines_id: req.body.routines_id,
      rating: req.body.rating,
      notes: req.body.notes,
      date: req.body.date,
    }, '*')
    .where('users_id', req.swagger.params.users_id.value)
    .andWhere('id', req.swagger.params.id.value)
    .then((result) => {
      res.send(result[0])
    })
    .catch((err) => {
      res.status(400);
      res.send({status: 400, ErrorMessage: 'Bad Request. Invalid Inputs.'});
    });

}

function deleteUsersIdLogId(req, res) {

  let log_entry;

  knex('log')
    .where('users_id', req.swagger.params.users_id.value)
    .andWhere('id', req.swagger.params.id.value)
    .select('*')
    .first()
    .then((result) => {
      log_entry = result;
      return knex('log')
        .del()
        .where('users_id', req.swagger.params.users_id.value)
        .andWhere('id', req.swagger.params.id.value);
    })
    .then(() => {
      if(log_entry) {
        res.send(log_entry);
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
