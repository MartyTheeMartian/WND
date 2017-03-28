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

  describe('exercises for visitors not logged in', () => {

    describe('GET /exercises', () => {

      it('should respond with a status code of 200', done => {
        request(app)
        .get('/exercises')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done)
      })

      it('should respond with a content type of json', done => {
        request(app)
        .get('/exercises')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/, done)
      })
    });

    describe('GET /exercises/:id', () => {

      it('should respond with specific exercise for associated valid id', done => {
        request(app)
        .get('/exercises/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, {
          id: 1,
          users_id: null,
          name: '',
          description: 'This exercise entails anything involving soccer, including any exercises that are soccer-related.',
          exercise_type: 1,
          status: 1,
          created_at: '2016-06-29T14:26:16.000Z',
          updated_at: '2016-06-29T14:26:16.000Z'
        }, done)
      })

      it('should respond with specific exercise for associated valid id', done => {
        request(app)
        .get('/exercises/2')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, {
          id: 2,
          users_id: null,
          name: '52',
          description: 'With a deck of cards, pick a card and do push ups relating to the number value on the card. For example if a Jack of Hearts is picked, do 10 pushups.',
          status: 1,
          exercise_type: 1,
          created_at: '2016-06-29T14:26:16.000Z',
          updated_at: '2016-06-29T14:26:16.000Z'
        }, done)
      })

      it('should respond with 404 and Not Found if wrong id', done => {
        request(app)
        .get('/exercises/-1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404, {"status":404,"ErrorMessage":"Not Found"}, done)
      })

      it('should respond with 404 and Not Found if wrong id', done => {
        request(app)
        .get('/exercises/3000')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect({'status':404,'ErrorMessage':'Not Found'}, done)
      })

    });
  })
});
