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

function patchUsersIdWeightId(req, res) {

  knex('weight')
    .where('users_id', req.swagger.params.users_id.value)
    .andWhere('id', req.swagger.params.id.value)
    .update({
      weight: req.body.weight,
      date: req.body.date
    }, '*')
    .then((result) => {
      res.send(result[0]);
    })
    .catch((err) => {
      res.status(400);
      res.send({status: 400, ErrorMessage: 'Bad Request. Invalid Inputs.'});
    });
}

function deleteUsersIdWeightId(req, res) {

  let weight_entry;

  knex('weight')
    .where('users_id', req.swagger.params.users_id.value)
    .andWhere('id', req.swagger.params.id.value)
    .select('*')
    .first()
    .then((result) => {
      weight_entry = result;
      return knex('weight')
        .del()
        .where('users_id', req.swagger.params.users_id.value)
        .andWhere('id', req.swagger.params.id.value);
    })
    .then(() => {
      if(weight_entry) {
        res.send(weight_entry);
      }
      else {
        throw new Error();
      }
    })
    .catch((err) => {
      res.setStatus(404);
      res.send('Not Found');
    });

}
