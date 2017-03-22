'use strict';

var util = require('util');
const knex = require('../../knex');


module.exports = {
  getUsersIdFavorites: getUsersIdFavorites,
  postUsersIdFavorites: postUsersIdFavorites
};


function getUsersIdFavorites(req, res) {

  knex('favorites')
    .where('users_id', req.swagger.params.users_id.value)
    .select('*')
    .then((result) => {
      console.log(result)
      res.send(result);
    })
    .catch((err) => {
      next();
    });

}

function postUsersIdFavorites(req, res) {

  knex('favorites')
    .insert({
      users_id: req.swagger.params.users_id.value,
      routines_id: req.swagger.params.id.value
    })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      next();
    });

}
