'use strict';

process.env.NODE_ENV = 'test';

const request = require('supertest');
const knex = require('../../../knex');
const expect = require('chai').expect;
const app = require('../../../app');

describe('controllers', () => {

  before((done) => {
    knex.migrate.latest()
    .then(() => {
      return knex.seed.run();
    })
    .then(() => {
        done();
    })
    .catch((err) => {
        done(err);
    });
  });

  after((done) => {
    knex.migrate.rollback()
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
  });

    describe('exercises for users', () => {

      describe('GET /users/:id/exercises', () => {

        it('should respond with an array of the exercises for a user', done => {
          request(app)
          .get('/users/1/exercises')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200, [{
            id: 1,
            users_id: 1,
            routines_id: 1,
            created_at: '2016-06-29T14:26:16.000Z',
            updated_at: '2016-06-29T14:26:16.000Z'
          }], done)
        })

        it('should respond with 404 Not Found for invalid user id', done => {
          request(app)
          .get('/users/-1/exercises')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(404, {status: 404, ErrorMessage: 'Not Found'}, done)
        })
      })

      describe('POST /users/:id/exercises', () => {

        it('should post a user exercise to exercises if valid user id is provided', done => {
          request(app)
          .post('/users/1/exercises')
          .send({
            users_id: 1,
            routines_id: 2,
          })
          .expect((res) => {
            delete res.body.created_at;
            delete res.body.updated_at;
          })
          .expect('Content-Type', /json/)
          .expect({
            id: 1,
            users_id: null,
            name: '',
            description: 'This exercise entails anything involving soccer, including any exercises that are soccer-related.',
            exercise_type: 1,
            status: 0,
            created_at: '2016-06-29T14:26:16.000Z',
            updated_at: '2016-06-29T14:26:16.000Z'
          }, done)
        })

        it('should respond with 400 Bad Request if invalid user id is provided', done => {
          request(app)
          .post('/users/-1/exercises')
          .send([{
            users_id: 1,
            routines_id: 2,
          }])
          .expect('Content-Type', /json/)
          .expect({status: 400, ErrorMessage: 'Bad Request. Invalid Inputs.'}, done)
        })
      });
    });
  });
