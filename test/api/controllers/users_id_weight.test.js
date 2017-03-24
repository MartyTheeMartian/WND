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

    after(function(done) {
      knex.migrate.rollback()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
    });

  describe('weight for users', () => {

    describe('GET /users/:id/weight', () => {

      it('should respond with an array of objects containing past weight entries and data', done => {
        request(app)
        .get('/users/1/weight')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, [{
          id:1,
          users_id:1,
          weight:175,
          date:'2016-06-29T07:00:00.000Z',
          created_at:'2016-06-29T14:26:16.000Z',
          updated_at:'2016-06-29T14:26:16.000Z'
        }], done)
      })

      it('should respond with 404 Not Found if an invalid user id is provied', done => {
        request(app)
        .get('/users/-1/weight')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect({status: 404, ErrorMessage: 'Not Found'}, done)
      })

      it('should respond with 404 Not Found if an invalid user id is provied', done => {
        request(app)
        .get('/users/10000/weight')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect({status: 404, ErrorMessage: 'Not Found'}, done)
      })

    });

    describe('POST /users/:id/weight', () => {

      it('should post a weight if valid user id is provided', done => {
        request(app)
        .post('/users/1/weight')
        .send({
          users_id: 1,
          weight: 200,
          date: "2017-03-24"
        })
        .expect((res) => {
          delete res.body.created_at;
          delete res.body.updated_at;
        })
        .expect('Content-Type', /json/)
        .expect({
          id: 2,
          users_id: 1,
          weight: 200,
          date: '2017-03-24T07:00:00.000Z',
        }, done)
      })

      it('should respond with 400 Bad Request if invalid user id is provided', done => {
        request(app)
        .post('/users/-1/weight')
        .send({
          users_id: 1,
          weight: 200,
          date: "2017-03-24"
        })
        .expect('Content-Type', /json/)
        .expect({status: 400, ErrorMessage: 'Bad Request. Invalid Inputs.'}, done)
      })
    });
  });
});
