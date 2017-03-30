'use strict';

process.env.NODE_ENV = 'test';

const request = require('supertest');
const knex = require('../../../knex');
const expect = require('chai').expect;
const app = require('../../../app');
const bcrypt = require('bcrypt');

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

  describe('signup for visitors not logged in', () => {

    const password = 'ilikebigpasswords';

    describe('POST /users', done => {

      request(app)
      .post('/users')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({
        id: 1001,
        first_name: 'Jim Bob',
        last_name: 'Cooter',
        weight: 500,
        email: 'jimbo@gmail.com',
        status: 1,
        hashed_password: password
      })
      .expect(res => {
        delete res.body.createdAt;
        delete res.body.updatedAt;
      })
      .expect(200, {
        id: 1001,
        first_name: 'Jim Bob',
        last_name: 'Cooter',
        weight: 500,
        email: 'jimbo@gmail.com',
        status: 1,
        hashed_password: password
      }, done)
    })
  })

});
