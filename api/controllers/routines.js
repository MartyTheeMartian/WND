'use strict';

var util = require('util');
const knex = require('../../knex');


module.exports = {
  getRoutines: getRoutines
};

function getRoutines(req, res) {

  knex('routines')
    .select('*')
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      err.message = 'Not Found.'
      res.send(err);
    });

}
