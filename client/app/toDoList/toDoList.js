'use strict';

// angular.module('poppinApp')
//   .config(function ($stateProvider) {
//     $stateProvider
//       .state('toDoList', {
//         url: '/toDoList',
//         template: '<to-do-list></to-do-list>'
//       });
//   });

angular.module('poppinApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('toDoList', {
        url: '/toDoList',
        templateUrl: 'app/toDoList/toDoList.html',
        controller: 'toDoListCtrl',
        authenticate: true
        // controllerAs: 'main'
      });
  });
