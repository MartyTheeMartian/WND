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
