'use strict';

angular.module('poppinApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('city', {
        url: '/city',
        template: '<city></city>'
      });
  });
