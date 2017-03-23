'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const request = require('supertest');
const knex = require('../../../knex');
const assert = require('chai').assert;
const expect = require('chai').expect;
const app = require('../../../app');

describe('controllers', () => {

    beforeEach((done) => {
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

    afterEach(function(done) {
      knex.migrate.rollback()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
    });

  describe('exercises', () => {

    describe('GET /exercises', () => {

      it ('should respond with a status code of 200', (done) => {
        request(app)
        .get('/exercises')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done)
      })

      it('should respond with a content type of json', (done) => {
        request(app)
        .get('/exercises')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/, done)
      })

    });
  })

});
