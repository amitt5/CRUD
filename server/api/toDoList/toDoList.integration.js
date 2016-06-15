'use strict';

var app = require('../..');
import request from 'supertest';

var newToDoList;

describe('ToDoList API:', function() {

  describe('GET /api/toDoLists', function() {
    var toDoLists;

    beforeEach(function(done) {
      request(app)
        .get('/api/toDoLists')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          toDoLists = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      toDoLists.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/toDoLists', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/toDoLists')
        .send({
          name: 'New ToDoList',
          info: 'This is the brand new toDoList!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newToDoList = res.body;
          done();
        });
    });

    it('should respond with the newly created toDoList', function() {
      newToDoList.name.should.equal('New ToDoList');
      newToDoList.info.should.equal('This is the brand new toDoList!!!');
    });

  });

  describe('GET /api/toDoLists/:id', function() {
    var toDoList;

    beforeEach(function(done) {
      request(app)
        .get('/api/toDoLists/' + newToDoList._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          toDoList = res.body;
          done();
        });
    });

    afterEach(function() {
      toDoList = {};
    });

    it('should respond with the requested toDoList', function() {
      toDoList.name.should.equal('New ToDoList');
      toDoList.info.should.equal('This is the brand new toDoList!!!');
    });

  });

  describe('PUT /api/toDoLists/:id', function() {
    var updatedToDoList;

    beforeEach(function(done) {
      request(app)
        .put('/api/toDoLists/' + newToDoList._id)
        .send({
          name: 'Updated ToDoList',
          info: 'This is the updated toDoList!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedToDoList = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedToDoList = {};
    });

    it('should respond with the updated toDoList', function() {
      updatedToDoList.name.should.equal('Updated ToDoList');
      updatedToDoList.info.should.equal('This is the updated toDoList!!!');
    });

  });

  describe('DELETE /api/toDoLists/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/toDoLists/' + newToDoList._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when toDoList does not exist', function(done) {
      request(app)
        .delete('/api/toDoLists/' + newToDoList._id)
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
