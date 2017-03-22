'use strict';

var util = require('util');
const knex = require('../../knex');


module.exports = {
  getRoutines: getRoutines
};

function getRoutines(req, res) {

  knex('routines')
    .where('users_id', null)
    .select('*')
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.setStatus(404);
      res.send('Not Found');
    });

}
