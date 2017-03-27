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

  describe('specific routines for users and routines id', () => {

    describe('GET /users/:id/routines/:id', () => {

      it('should return a specific routine for a specific user and routine id', done => {
        request(app)
        .get('/users/1/routines/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, {
          id: 1,
          users_id: 1,
          name: 'Hardcore Core',
          description: 'Intense core workout',
          created_at: '2016-06-29T14:26:16.000Z',
          updated_at: '2016-06-29T14:26:16.000Z'
        }, done)
      })

      it('should respond with 404 Not Found for invalid user id', done => {
        request(app)
        .get('/users/-1/routines/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404, {status: 404, ErrorMessage: 'Not Found'}, done)
      })

      it('should respond with 404 Not Found for invalid routine id', done => {
        request(app)
        .get('/users/1/routines/-1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404, {status: 404, ErrorMessage: 'Not Found'}, done)
      })
    })

    describe('PATCH /users/:id/routines/:id', () => {

      it('should patch a user routine if valid user id is provided', done => {
        request(app)
        .patch('/users/1/routines/1')
        .send({
          users_id: 1,
          name: 'The Pain Plan',
          description: 'Imminent Pain!',
          exercises: [1, 2, 3],
          created_at: new Date('2016-06-29 14:26:16 UTC'),
          updated_at: new Date('2016-06-29 14:26:16 UTC')
        })
        .expect((res) => {
          delete res.body.created_at;
          delete res.body.updated_at;
        })
        .expect('Content-Type', /json/)
        .expect({
          id: 1,
          users_id: 1,
          name: 'The Pain Plan',
          description: 'Imminent Pain!'
        }, done)
      })

      it('should respond with 400 Bad Request if invalid user id is provided', done => {
        request(app)
        .patch('/users/-1/routines/1')
        .send([{
          users_id: 1,
          routines_id: 2,
        }])
        .expect('Content-Type', /json/)
        .expect({status: 400, ErrorMessage: 'Bad Request. Invalid Inputs.'}, done)
      })

      it('should respond with 400 Bad Request if invalid routine id is provided', done => {
        request(app)
        .patch('/users/1/routines/-1')
        .send([{
          users_id: 1,
          routines_id: 2,
        }])
        .expect('Content-Type', /json/)
        .expect({status: 400, ErrorMessage: 'Bad Request. Invalid Inputs.'}, done)
      })
    })

    describe('DELETE users/:id/routines/:id', () => {

      it('should respond with the deleted routine', done => {
        request(app)
        .delete('/users/1/routines/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(res => {
          delete res.body.created_at;
          delete res.body.updated_at;
        })
        .expect({
          id: 1,
          users_id: 1,
          name: 'The Pain Plan',
          description: 'Imminent Pain!'
        }, done)
      })

      it('should respond with 404 Not Found if invalid user id is provided', done => {
        request(app)
        .del('/users/-1/routines/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(res => {
          delete res.body.created_at;
          delete res.body.updated_at;
        })
        .expect(404, {status: 404, ErrorMessage: 'Not Found.'}, done)
      })

      it('should respond with 404 Not Found if invalid routine id is provided', done => {
        request(app)
        .del('/users/1/routines/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(res => {
          delete res.body.created_at;
          delete res.body.updated_at;
        })
        .expect(404, {status: 404, ErrorMessage: 'Not Found.'}, done)
      })
    })
  })
})
