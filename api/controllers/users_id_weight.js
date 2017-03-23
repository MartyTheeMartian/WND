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
      if (result) {
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

function postUsersIdWeight(req, res) {

  knex('weight')
    .insert({
      users_id: req.swagger.params.users_id.value,
      weight: req.body.weight,
      date: req.body.date
    },'*')
    .then((result) => {
      console.log(result)
      res.send(result[0]);
    })
    .catch((err) => {
      res.status(400);
      res.send({status: 400, ErrorMessage: 'Bad Request. Invalid Inputs.'});
    });
}
