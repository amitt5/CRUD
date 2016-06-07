'use strict';

// angular.module('poppinApp')
//   .config(function ($stateProvider) {
//     $stateProvider
//       .state('city', {
//         url: '/city',
//         template: '<city></city>',
// 	controllerAs: 'vm'
//       });
//   });

angular.module('poppinApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('city', {
        url: '/city',
        templateUrl: 'app/city/city.html',
        controller: 'CityCtrl',
        authenticate: true
        // controllerAs: 'main'
      });
  });
