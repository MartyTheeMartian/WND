'use strict';

var util = require('util');
const knex = require('../../knex');


module.exports = {
  getRoutinesId: getRoutinesId
};


function getRoutinesId(req, res) {

  knex('routines')
    .where('users_id', null)
    .andWhere('id', req.swagger.params.id.value)
    .select('*')
    .first()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.setStatus(404);
      res.send('Not Found');
    });

}
