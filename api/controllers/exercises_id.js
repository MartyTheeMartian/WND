'use strict';

var util = require('util');
const knex = require('../../knex');


module.exports = {
  exercisesId: exercisesId
};


function exercisesId(req, res) {

  knex('exercises')
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
