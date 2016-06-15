'use strict';

describe('Component: ToDoListComponent', function () {

  // load the controller's module
  beforeEach(module('poppinApp'));

  var ToDoListComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    ToDoListComponent = $componentController('ToDoListComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
