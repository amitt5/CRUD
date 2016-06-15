'use strict';

angular.module('poppinApp')
  .controller('TestCtrl', function ($scope, $http, $state, Auth) {
    
    $scope.test  = {};    
    $scope.editRecord  = {};    
    $scope.allNames = {};
    $scope.result = {};
    $scope.test  = {};    
    $scope.showEdit  = true;   
    $scope.idCounter  = {};   


    // console.log("in  CityCtrl");
    // console.log($scope.city);

    $scope.DisableEdit = function(id) {
        // console.log("Edit Enabled");
        // console.log(id);
        // console.log($scope.editRecord.name);
        $scope.idCounter = id;
        
        $scope.showEdit  = !$scope.showEdit;  
        $scope.editRecord.name = ""; 
        $scope.editRecord.age = "";  
 
    }

     $scope.UpdateName = function() {
        console.log("Edit Enabled");
        console.log($scope.idCounter);
        // console.log($scope.editRecord.name);
        var senturl = '/api/testpages/' + $scope.idCounter;
        console.log(senturl);
        
        $http.put(senturl, {name: $scope.editRecord.name, age: $scope.editRecord.age}).then(function(resp) {
            console.log('data updated');
            console.log($scope.idCounter);
            $scope.showEdit  = true;        
            $scope.idCounter  = true;   
            $scope.getNameList();

        }, function(err) {
            console.log('error submitting data');
        });

    }

    // $scope.SaveUpdates = function(form) {
    //     console.log(form);
    //     console.log("Save update called");
    //     $scope.showEdit  = !$scope.showEdit;    
    //     console.log($scope.allNames.length);
    //     for (var i = 0; i < $scope.allNames.length; i++) { 
    //     console.log("for loop " + i);
    //     console.log($scope.test.updatedage);
    //     var senturl = '/api/testpages/' + $scope.allNames[i]._id;
        
    //     // $http.put(senturl, {age: $scope.test.updatedage}).then(function(resp) {
    //     //     console.log('data updated');
    //     //     console.log(resp);
    //     //     $scope.getNameList();

    //     // }, function(err) {
    //     //     console.log('error submitting data');
    //     // });

    //     }

    // }

    $scope.submitTest = function(form) {
    	//console.log(form);
    	console.log($scope.test);
    	console.log("submitTest");

    	$http.post('/api/testpages/', {name: $scope.test.name, age: $scope.test.age}).then(function(resp) {
    		console.log('data submitted');
    		console.log(resp);
            $scope.getNameList();

    	}, function(err) {
    		console.log('error submitting data');
    	});

    }

    $scope.getNameList = function() {
    	$http.get('/api/testpages').then(function(resp) {
    		$scope.allNames = resp.data; 
            // console.log($scope.allNames);

    	}, function(err) {
    		console.log('error retrieving data');

    	});
    }

    $scope.SearchName = function() {
       
        $http({
            url: '/api/testpages/search',
            method: "GET",
            params: {name: $scope.test.searchname}
          }).then(response => {

            $scope.result = response.data;
            console.log($scope.result);

          
          });
    }

    $scope.UpdateAge = function(form) {

        console.log("update guygy");
        console.log($scope.test.updatedage);
        var senturl = '/api/testpages/' + $scope.allNames[6]._id;
        console.log(senturl);
        
        $http.put(senturl, {age: $scope.test.updatedage}).then(function(resp) {
            console.log('data updated');
            console.log(resp);
            $scope.getNameList();

        }, function(err) {
            console.log('error submitting data');
        });
    }

    $scope.DeleteRecord = function(id) {

        console.log("delete called");
        var senturl = '/api/testpages/' + id;
        console.log(senturl);
        
        $http.delete(senturl).then(function(resp) {
            console.log('data deleted');
            console.log(resp);
            $scope.getNameList();

        }, function(err) {
            console.log('error submitting data');
        });
    }

    $scope.getNameList();
  });



