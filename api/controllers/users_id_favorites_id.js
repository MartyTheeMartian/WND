'use strict';

var util = require('util');
const knex = require('../../knex');


module.exports = {
  getUsersIdFavoritesId: getUsersIdFavoritesId,
  deleteUsersIdFavoritesId: deleteUsersIdFavoritesId
};

function getUsersIdFavoritesId(req, res) {

  knex('favorites')
    .where('users_id', req.swagger.params.users_id.value)
    .andWhere('id', req.swagger.params.id.value)
    .select('*')
    .first()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      next();
    });
}



function deleteUsersIdFavoritesId(req, res) {

  knex('favorites')
    .where('users_id', req.swagger.params.users_id.value)
    .andWhere('id', req.swagger.params.id.value)
    .select('*')
    .first()
    .then((result) => {
      knex('favorites')
        .where('users_id', req.swagger.params.users_id.value)
        .andWhere('id', req.swagger.params.id.value)
        .select('*')
        .first()
        .del();
      res.send(result);
    })
    .catch((err) => {
      next();
    });

}
