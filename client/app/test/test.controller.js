'use strict';

angular.module('poppinApp')
  .controller('TestCtrl', function ($scope, $http, $state, Auth) {
    
    $scope.test  = {};    
    $scope.editRecord  = {};    
    $scope.allNames = {};
    $scope.search = {};
    $scope.test  = {};    
    $scope.showEdit  = true;   
    $scope.idCounter  = {};   
    var userId;


    console.log("auth not called yet");

    Auth.getCurrentUser(function(user){
        console.log("auth called");
        userId = user._id;
        console.log(user);
        console.log(userId);
        $scope.getNameList();

    }
    );
    

    $scope.DisableEdit = function(id) {
        console.log("Edit Enabled");
        console.log(id);
        console.log($scope.editRecord.name);
        $scope.idCounter = id;
        
        $scope.showEdit  = !$scope.showEdit;  
        $scope.editRecord.name = ""; 
        $scope.editRecord.age = "";  
 
    }

     $scope.UpdateName = function() {
        console.log("update called");
        console.log($scope.idCounter);
        // console.log($scope.editRecord.name);
        var senturl = '/api/testpages/' + $scope.idCounter;
        console.log(senturl);
        
        $http.put(senturl, {name: $scope.editRecord.name, age: $scope.editRecord.age}).then(function(resp) {
            console.log('data updated');
            console.log($scope.idCounter);
            $scope.showEdit  = true;        
           // $scope.idCounter  = true;   
            $scope.UpdateGrid();
            

        }, function(err) {
            console.log('error submitting data');
        });

    }

    $scope.UpdateGrid = function() {
        console.log("UpdateGrid called");
        var nameInfo  = $scope.allNames;
            _.map(nameInfo, function(obj){
              if(obj._id== $scope.idCounter) {
                obj.name = $scope.editRecord.name;
                obj.age = $scope.editRecord.age;

              }
            });
        $scope.idCounter  = true;   
    }


    $scope.submitTest = function(form) {
    	//console.log(form);
    	console.log($scope.test);
    	console.log("submitTest");
        console.log(userId);
        
    	$http.post('/api/testpages/', {name: $scope.test.name, age: $scope.test.age, userId: userId}).then(function(resp) {
    		console.log('data submitted');
    		console.log(resp);
            $scope.getNameList();

    	}, function(err) {
    		console.log('error submitting data');
    	});

    }


    $scope.getNameList = function() {
        console.log("idsjkdskdd");
        console.log(userId);
        
        $http({
            url: '/api/testpages/search',
            method: "GET",
            params: {userId: userId}
          }).then(response => {

            $scope.allNames = response.data;
            console.log($scope.allNames);

          
          });
    }


    $scope.searchByName = function(byUser) {
        console.log(byUser);
        console.log("searchByName");
        if (byUser){
            var byUserId = userId;
            console.log("inside if");

        }
        console.log(userId);
        if ($scope.search.age == false){
            $scope.search.age = "*";
            console.log("inside if");

        }
        console.log($scope.search.age);

        $http({
            url: '/api/testpages/search',
            method: "GET",
            params: {name: $scope.search.name,age: $scope.search.age,userId: byUserId}
                
          }).then(response => {

            $scope.allNames = response.data;
            console.log(response.data);
          });
            
    }

    // $scope.searchByAge = function() {
    //     console.log("searchByAge");
    //     console.log(userId);

    //     $http({
    //         url: '/api/testpages/search',
    //         method: "GET",
    //         params: {userId: userId}
    //       }).then(response => {

    //         $scope.allNames = response.data;
    //         console.log($scope.allNames);

          
    //       });
    // }

   

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

  });



