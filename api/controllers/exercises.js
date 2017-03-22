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
      res.send(result);
    })
    .catch((err) => {
      res.status(404);
      res.send('Not Found');
    });

}
