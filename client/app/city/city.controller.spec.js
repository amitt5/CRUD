'use strict';

describe('Component: CityComponent', function () {

  // load the controller's module
  beforeEach(module('poppinApp'));

  var CityComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    CityComponent = $componentController('CityComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
