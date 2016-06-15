'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var toDoListCtrlStub = {
  index: 'toDoListCtrl.index',
  show: 'toDoListCtrl.show',
  create: 'toDoListCtrl.create',
  update: 'toDoListCtrl.update',
  destroy: 'toDoListCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var toDoListIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './toDoList.controller': toDoListCtrlStub
});

describe('ToDoList API Router:', function() {

  it('should return an express router instance', function() {
    toDoListIndex.should.equal(routerStub);
  });

  describe('GET /api/toDoLists', function() {

    it('should route to toDoList.controller.index', function() {
      routerStub.get
        .withArgs('/', 'toDoListCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/toDoLists/:id', function() {

    it('should route to toDoList.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'toDoListCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/toDoLists', function() {

    it('should route to toDoList.controller.create', function() {
      routerStub.post
        .withArgs('/', 'toDoListCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/toDoLists/:id', function() {

    it('should route to toDoList.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'toDoListCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/toDoLists/:id', function() {

    it('should route to toDoList.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'toDoListCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/toDoLists/:id', function() {

    it('should route to toDoList.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'toDoListCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
