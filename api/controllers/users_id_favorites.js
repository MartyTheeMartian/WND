'use strict';

var util = require('util');
const knex = require('../../knex');
const bodyParser = require('body-parser');

module.exports = {
  getUsersIdFavorites: getUsersIdFavorites,
  postUsersIdFavorites: postUsersIdFavorites
};


function getUsersIdFavorites(req, res) {

  knex('favorites')
    .where('users_id', req.swagger.params.users_id.value)
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
function postUsersIdFavorites(req, res) {

  knex('favorites')
    .where('users_id', req.swagger.params.users_id.value)
    .andWhere('routines_id', req.body.routines_id)
    .first()
    .then((match) => {
      // If routine already exists in user's favorites
      if(match) {
        res.status(400);
        res.send({status: 400, ErrorMessage: 'Bad Request. Routine already in Favorites.'});
      }
      else {
        knex('favorites')
          .insert({
            users_id: req.swagger.params.users_id.value,
            routines_id: req.body.routines_id
          },'*')
          .then((result) => {
            res.send(result[0]);
          });
      }
    })
    .catch((err) => {
      res.status(400);
      res.send({status: 400, ErrorMessage: 'Bad Request. Invalid Inputs.'});
    });

}
