'use strict';

var util = require('util');
const knex = require('../../knex');
const bodyParser = require('body-parser');

module.exports = {
  getExercises_params: getExercises_params,
  postExercises_params: postExercises_params,
  patchExercises_params: patchExercises_params,
  deleteExercises_params: deleteExercises_params
};

function getExercises_params(req, res) {

  knex('exercises_params')
    .where('routines_exercises_id', req.swagger.params.re_id.value)
    .select('*')
    .first()
    .then((result) => {
      if(result) {
        if(result.sets === null) {
          delete result.sets;
        }
        if(result.reps === null) {
          delete result.reps;
        }
        if(result.duration === null) {
          delete result.duration;
        }
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

function postExercises_params(req, res) {

  knex('exercises_params')
    .where('routines_exercises_id', req.body.re_id)
    .andWhere('users_id', req.swagger.params.users_id.value)
    .first()
    .then((match) => {
      if(match) {
        res.status(400);
        res.send({status: 400, ErrorMessage: 'Bad Request.'});
      }
      else{
        knex('exercises_params')
          .insert({
            users_id: req.swagger.params.users_id.value,
            routines_exercises_id: req.body.re_id,
            sets: req.body.sets,
            reps: req.body.reps,
            duration: req.body.duration
          },'*')
          .then((result) => {
            console.log(result);
            res.send(result[0]);
          });
      }
    })
    .catch((err) => {
      res.status(400);
      res.send({status: 400, ErrorMessage: 'Bad Request. Invalid Inputs.'})
    });
}

function patchExercises_params(req, res) {

  knex('exercises_params')
    .update({
      sets: req.body.sets,
      reps: req.body.reps,
      duration: req.body.duration
    }, '*')
    .where('routines_exercises_id', req.swagger.params.re_id.value)
    .first()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(400);
      res.send({status: 400, ErrorMessage: 'Bad Request. Invalid Inputs.'})
    });

}

function deleteExercises_params(req, res) {

  let exerciseParams;

  knex('exercises_params')
    .where('routines_exercises_id', req.swagger.params.re_id.value)
    .select('*')
    .first()
    .then((result) => {
      exerciseParams = result;
      return knex('exercises_params')
        .del()
        .where('routines_exercises_id', req.swagger.params.re_id.value);
    })
    .then(() => {
      if(exerciseParams) {
        res.send(exerciseParams);
      }
      else {
        throw new Error();
      }
    })
    .catch((err) => {
      res.status(404);
      res.send({status: 404, ErrorMessage: 'Not Found.'});
    });

}
