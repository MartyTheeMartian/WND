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
        console.log(res);
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

// it('should respond with 400 and "Email already exists" if email is taken', done => {
//   knex('users')
//     .insert({
//       id: 10000,
//       first_name: 'John',
//       last_name: 'Siracusa',weight: 175,
//       email: 'john.siracusa@gmail.com',
//       status: 1,
//       hashed_password: bcrypt.hashSync('ilikebigcats', 1)
//       // created_at: new Date('2016-06-29 14:26:16 UTC'),
//       // updated_at: new Date('2016-06-29 14:26:16 UTC')
//     })
//     .then(() => {
//       request(app)
//         .post('/users')
//         .set('Accept', 'application/json')
//         .set('Content-Type', 'application/json')
//         .send({
//           id: 10001,
//           first_name: 'John',
//           last_name: 'Siracusa',
//           weight: 175,
//           email: 'john.siracusa@gmail.com',
//           status: 1,
//           hashed_password: 'ilikebigcats'
//           // created_at: new Date('2016-06-29 14:26:16 UTC'),
//           // updated_at: new Date('2016-06-29 14:26:16 UTC')
//         })
//         // .expect('Content-Type', /plain/)
//         .expect(400, 'Email already exists', done);
//     })
//     .catch((err) => {
//       done(err);
//     });
//   request(app)
//   .post('/users')
//   .set('Accept', 'application/json')
//   .send({
//     first_name: 'blank',
//     last_name: 'blank',
//     weight: 180,
//     email: 'sb@gmail.com',
//     password: password
//   })
//   .expect(400, {status: 400, ErrorMessage: 'Email already exists'}, done)
// })

// it('should respond with a content type of json', done => {
//   request(app)
//   .get('/users')
//   .set('Accept', 'application/json')
//   .expect('Content-Type', /json/, done)
// })
