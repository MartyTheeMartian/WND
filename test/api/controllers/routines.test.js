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

    describe('GET /routines', () => {

      it('should respond with a status code of 200', done => {
        request(app)
        .get('/routines')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done)
      })

      it('should respond with a content type of json', done => {
        request(app)
        .get('/routines')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/, done)
      })

    })

    describe('GET /routines/:id', () => {

      it('should respond with a status code of 200', done => {
        request(app)
        .get('/routines')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done)
      })

      it('should respond with a content type of json', done => {
        request(app)
        .get('/routines')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/, done)
      })

      it('should respond with a specific routine for associated valid id', done => {
        request(app)
        .get('/routines/2')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, {
          id: 2,
          users_id: null,
          name: 'Arms',
          description: 'Upper body, biceps, triceps, forearms',
          created_at: ('2016-06-29T14:26:16.000Z'),
          updated_at: ('2016-06-29T14:26:16.000Z')
        }, done)
      })

      it('should respond with 404 Not Found for valid id associated with an existing user', done => {
        request(app)
        .get('/routines/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect({'status':404,'ErrorMessage':'Not Found'}, done)
      })

      it('should respond with 404 Not Found for invalid id', done => {
        request(app)
        .get('/routines/-1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect({'status':404,'ErrorMessage':'Not Found'}, done)
      })

      it('should respond with 404 Not Found for invalid id', done => {
        request(app)
        .get('/routines/100000')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect({'status':404,'ErrorMessage':'Not Found'}, done)
      })

    })
  })
})
