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

    describe('', () => {

      describe('GET /exercises', () => {

        it('should respond with a status code of 200', done => {
          request(app)
          .get('/exercises')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200, done)
        })
      });
    });
