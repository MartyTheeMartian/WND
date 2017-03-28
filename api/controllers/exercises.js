'use strict';

var util = require('util');
const knex = require('../../knex');


module.exports = {
  getExercises: getExercises
};

function getExercises(req, res) {

  knex('exercises')
    .where('users_id', null)
    .select('*')
    .then((result) => {
      if(result.length !== 0) {
        res.send(result);
      }
      else {
        throw new Error();
      }
    })
    .catch((err) => {
      res.status(204);
      res.send();
    });
}
