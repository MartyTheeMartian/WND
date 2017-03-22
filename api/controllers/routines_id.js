'use strict';

var util = require('util');
const knex = require('../../knex');


module.exports = {
  getRoutinesId: getRoutinesId
};


function getRoutinesId(req, res) {

  knex('routines')
    .where('id', req.swagger.params.id.value)
    .select('*')
    .first()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      next();
    });

}
