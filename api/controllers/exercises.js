'use strict';

var util = require('util');
const knex = require('../../knex');


module.exports = {
  getExercises: getExercises
};

function getExercises(req, res) {

  knex('exercises')
    .select('*')
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      next();
    });

}
