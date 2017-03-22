process.env.NODE_ENV = 'test';

const request = require('supertest');
const expect = require('chai').expect;
const app = require('../../../app');
const knex = require('../../../knex');

describe('GET /exercises', () => {
  it('responds with JSON', done => {
    request(app)
      .get('/exercises')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

xdescribe('GET /exercises/:id', () => {

});

xdescribe('POST /exercises', () => {

});

xdescribe('PUT /exercises/:id', () => {

});

xdescribe('DELETE /exercises', () => {

});
