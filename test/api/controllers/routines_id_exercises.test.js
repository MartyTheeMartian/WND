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

  after(done => {
    knex.migrate.rollback()
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
  });
  describe('routines for visitors not logged in', () => {

    describe('GET /routines/:id/exercises', () => {

      it('should respond with array of exercises for a specific routine id', done => {
        request(app)
        .get('/routines/20000/exercises')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, [{
          
        }], done)
      })
    });
  });
});
