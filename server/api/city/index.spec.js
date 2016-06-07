'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var cityCtrlStub = {
  index: 'cityCtrl.index',
  show: 'cityCtrl.show',
  create: 'cityCtrl.create',
  update: 'cityCtrl.update',
  destroy: 'cityCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var cityIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './city.controller': cityCtrlStub
});

describe('City API Router:', function() {

  it('should return an express router instance', function() {
    cityIndex.should.equal(routerStub);
  });

  describe('GET /api/citys', function() {

    it('should route to city.controller.index', function() {
      routerStub.get
        .withArgs('/', 'cityCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/citys/:id', function() {

    it('should route to city.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'cityCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/citys', function() {

    it('should route to city.controller.create', function() {
      routerStub.post
        .withArgs('/', 'cityCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/citys/:id', function() {

    it('should route to city.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'cityCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/citys/:id', function() {

    it('should route to city.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'cityCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/citys/:id', function() {

    it('should route to city.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'cityCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
