'use strict';

var util = require('util');
const knex = require('../../knex');


module.exports = {
  getExercisesId: getExercisesId
};


function getExercisesId(req, res) {

  knex('exercises')
    .where('users_id', null)
    .where('id', req.swagger.params.id.value)
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
