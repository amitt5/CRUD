'use strict';

// angular.module('poppinApp')
//   .config(function ($stateProvider) {
//     $stateProvider
//       .state('test', {
//         url: '/test',
//         template: '<test></test>'
//       });
//   });

angular.module('poppinApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('test', {
        url: '/test',
        templateUrl: 'app/test/test.html',
        controller: 'TestCtrl'     
           // controllerAs: 'main'
      });
  });