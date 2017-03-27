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

    describe('request for specific user custom routine', () => {

      describe('GET /users/:id/exercises/:id', () => {

        it('should respond with the specific exercise by given id', done => {
          request(app)
          .get('/users/1/exercises/1')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200, {
            id: 1,
            users_id: 1,
            routines_id: 1,
            created_at: '2016-06-29T14:26:16.000Z',
            updated_at: '2016-06-29T14:26:16.000Z'
          }, done)
        })

        it('should respond with 404 Not Found for invalid user id', done => {
          request(app)
          .get('/users/-1/exercises/1')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(404, {status: 404, ErrorMessage: 'Not Found'}, done)
        })

        it('should respond with 404 Not Found for invalid exercise id', done => {
          request(app)
          .get('/users/1/exercises/-1')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(404, {status: 404, ErrorMessage: 'Not Found'}, done)
        })
      });
    });
  });
