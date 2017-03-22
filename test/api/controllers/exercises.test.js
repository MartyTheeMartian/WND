process.env.NODE_ENV = 'test';

const request = require('supertest');
const expect = require('chai').expect;
const app = require('../../../app');
const knex = require('../../../knex');

describe('RESTful API', () => {
  describe('GET /', () => {

    it ('should respond with a status code of 200', (done) => {
      request(app)
      .get('/')
      .expect(200, done)
    })

    it('should respond with a content type of text/html', (done) => {
      request(app)
      .get('/')
      .expect('Content-Type', /text\/html/, done)
    })

    it('should respond with a paragraph containing hello', (done) => {
      request(app)
      .get('/')
      .expect('<p>hello</p>', done)
    })
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
