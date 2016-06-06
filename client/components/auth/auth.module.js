'use strict';

angular.module('poppinApp.auth', ['poppinApp.constants', 'poppinApp.util', 'ngCookies', 'ui.router'])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
