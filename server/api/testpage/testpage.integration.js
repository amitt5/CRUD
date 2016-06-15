'use strict';

var app = require('../..');
import request from 'supertest';

var newTestpage;

describe('Testpage API:', function() {

  describe('GET /api/testpages', function() {
    var testpages;

    beforeEach(function(done) {
      request(app)
        .get('/api/testpages')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          testpages = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      testpages.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/testpages', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/testpages')
        .send({
          name: 'New Testpage',
          info: 'This is the brand new testpage!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newTestpage = res.body;
          done();
        });
    });

    it('should respond with the newly created testpage', function() {
      newTestpage.name.should.equal('New Testpage');
      newTestpage.info.should.equal('This is the brand new testpage!!!');
    });

  });

  describe('GET /api/testpages/:id', function() {
    var testpage;

    beforeEach(function(done) {
      request(app)
        .get('/api/testpages/' + newTestpage._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          testpage = res.body;
          done();
        });
    });

    afterEach(function() {
      testpage = {};
    });

    it('should respond with the requested testpage', function() {
      testpage.name.should.equal('New Testpage');
      testpage.info.should.equal('This is the brand new testpage!!!');
    });

  });

  describe('PUT /api/testpages/:id', function() {
    var updatedTestpage;

    beforeEach(function(done) {
      request(app)
        .put('/api/testpages/' + newTestpage._id)
        .send({
          name: 'Updated Testpage',
          info: 'This is the updated testpage!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedTestpage = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTestpage = {};
    });

    it('should respond with the updated testpage', function() {
      updatedTestpage.name.should.equal('Updated Testpage');
      updatedTestpage.info.should.equal('This is the updated testpage!!!');
    });

  });

  describe('DELETE /api/testpages/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/testpages/' + newTestpage._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when testpage does not exist', function(done) {
      request(app)
        .delete('/api/testpages/' + newTestpage._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
