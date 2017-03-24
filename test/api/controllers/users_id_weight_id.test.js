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

  describe('weight on specific entry date for users', () => {

    describe('GET /users/:id/weight/:id', () => {

      it('should respond with an object containing weight data for valid user and entry id', done => {
        request(app)
        .get('/users/1/weight/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, {
          id: 1,
          users_id: 1,
          weight: 175,
          date: "2016-06-29T07:00:00.000Z",
          created_at: "2016-06-29T14:26:16.000Z",
          updated_at: "2016-06-29T14:26:16.000Z"
        }, done)
      })

      it('should respond with 404 Not Found for an invalid user id', done => {
        request(app)
        .get('/users/-1/weight/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404, {status: 404, ErrorMessage: 'Not Found'}, done)
      })

      it('should respond with 404 Not Found for an invalid weight id', done => {
        request(app)
        .get('/users/1/weight/-1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404, {status: 404, ErrorMessage: 'Not Found'}, done)
      })
    });

    describe('PATCH /users/:id/weight/:id', () => {

      it('should respond with updated weight object when provided valid user and entry id and valid weight and date', done => {

        request(app)
        .patch('/users/1/weight/1')
        .send({
          id: 1,
          users_id: 1,
          weight: 200,
          date: "2016-06-29",
        })
        .expect((res) => {
          delete res.body.created_at;
          delete res.body.updated_at;
        })
        .expect('Content-Type', /json/)
        .expect({
          id: 1,
          users_id: 1,
          weight: 200,
          date: "2016-06-29T07:00:00.000Z",
        }, done)
      })

      it('should respond with 400 Bad Request for an invalid user id', done => {
        request(app)
        .patch('/users/-1/weight/1')
        .send([{
          users_id: 1,
          weight: 200,
          date: "2017-03-24"
        }])
        .expect('Content-Type', /json/)
        .expect(400, {status: 400, ErrorMessage: 'Bad Request. Invalid Inputs.'}, done)
      })

      it('should respond with 400 Bad Request for an invalid weight id', done => {
        request(app)
        .patch('/users/1/weight/-1')
        .send([{
          users_id: 1,
          weight: 200,
          date: "2017-03-24"
        }])
        .expect('Content-Type', /json/)
        .expect(400, {status: 400, ErrorMessage: 'Bad Request. Invalid Inputs.'}, done)
      })
    })
  });
});
