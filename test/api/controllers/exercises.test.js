process.env.NODE_ENV = 'test';

const should = require('should');
const request = require('supertest');
const expect = require('chai').expect;
const app = require('../../../app');

describe('controllers', () => {

  describe('exercises', () => {

    describe('GET /', () => {

      it ('should respond with a status code of 200', (done) => {
        request(app)
        .get('/')
        .expect(200, done)
      })

      it('should respond with a content type of text/html', (done) => {
        request(app)
        .get('/')
        // .set('Accept', 'application/json')
        .expect('Content-Type', /text\/html/, done)
      })

    });
  })

});


xdescribe('GET /exercises/:id', () => {

});

xdescribe('POST /exercises', () => {

});

xdescribe('PUT /exercises/:id', () => {

});

xdescribe('DELETE /exercises', () => {

});
