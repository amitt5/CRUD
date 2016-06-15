'use strict';

angular.module('poppinApp')
.controller('toDoListCtrl', function ($scope, $http, $state, Auth) {
 	
    console.log("test 1");

 	$scope.task = {};    
    $scope.toDoList = {};
    $scope.results = {};

    console.log(Auth);
    console.log("auth not  called yet");


    Auth.getCurrentUser(function(user){
    	console.log("auth called");
    	console.log(user);
    }
    );
    

    $scope.submitTask= function(form) {
    	console.log(form);
    	console.log($scope.task);
    	console.log("submittask");
    	$http.post('/api/toDoLists/', {name: $scope.task.name}).then(function(resp) {
    		console.log('data submitted');
    	}, function(err) {
    		// console.log('error submitting data');
    	});

    };



    $scope.getTaskList = function() {
    	$http.get('/api/toDoLists').then(function(resp) {
    		console.log(resp.data);
    		$scope.toDoList = resp.data; 
    	}, function(err) {
    		console.log('error retrieving data');

    	});
    }

    $scope.getTasks = function() {
        console.log("test 2");

        $http({
            url: '/api/toDoList/search',
            method: "GET",
            params: {name: $scope.task.taskname}
          })
        // .then(response => {

        //     $scope.toDoList = response.data;
        //     console.log($scope.toDoList);

          
    };

    
  }
);



