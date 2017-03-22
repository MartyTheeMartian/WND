'use strict';

var util = require('util');
const knex = require('../../knex');


module.exports = {
  getRoutinesIdExercises: getRoutinesIdExercises
};


function getRoutinesIdExercises(req, res) {

  knex('routines-exercises')
    .where('routines_id', req.swagger.params.id.value)
    .select('exercises_id')
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      next();
    });

}
