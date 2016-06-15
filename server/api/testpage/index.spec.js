'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var testpageCtrlStub = {
  index: 'testpageCtrl.index',
  show: 'testpageCtrl.show',
  create: 'testpageCtrl.create',
  update: 'testpageCtrl.update',
  destroy: 'testpageCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var testpageIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './testpage.controller': testpageCtrlStub
});

describe('Testpage API Router:', function() {

  it('should return an express router instance', function() {
    testpageIndex.should.equal(routerStub);
  });

  describe('GET /api/testpages', function() {

    it('should route to testpage.controller.index', function() {
      routerStub.get
        .withArgs('/', 'testpageCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/testpages/:id', function() {

    it('should route to testpage.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'testpageCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/testpages', function() {

    it('should route to testpage.controller.create', function() {
      routerStub.post
        .withArgs('/', 'testpageCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/testpages/:id', function() {

    it('should route to testpage.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'testpageCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/testpages/:id', function() {

    it('should route to testpage.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'testpageCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/testpages/:id', function() {

    it('should route to testpage.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'testpageCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
