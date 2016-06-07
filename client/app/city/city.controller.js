'use strict';

angular.module('poppinApp')
  .controller('CityCtrl', function ($scope, $http, $state, Auth) {

    $scope.city = {};    
    $scope.allCities = {};

    // console.log("in CityCtrl");
    // console.log($scope.city);


    $scope.submitCity = function(form) {
    	// console.log(form);
    	// console.log($scope.city);
    	// console.log("submitCity");
    	$http.post('/api/citys/', {name: $scope.city.name}).then(function(resp) {
    		// console.log('data submitted');
    	}, function(err) {
    		// console.log('error submitting data');
    	});

    }

    $scope.getCityList = function() {
    	$http.get('/api/citys').then(function(resp) {
    		// console.log(resp);
    		$scope.allCities = resp.data; 
    	}, function(err) {
    		// console.log('error retrieving data');

    	});
    }
  });



