(function() {
	'use strict';

	angular
	.module('mytodo')
	.controller('ListController', function ($scope, $routeParams, $http) {
	    $scope.lists = [];
	    $scope.formData = {};
	    $scope.boardId = $routeParams.boardId
	    $http.get('api/lists?boardId=' + $scope.boardId)
	        .success(function (data){
	            $scope.lists = data;
	        })
	        .error(function (data){
	            console.log('Error: ' +  data);
	        });
	    //Create a new list   
	    $scope.createList = function(){
	    	$scope.formData['_boardid'] = $scope.boardId;
	        $http.post('api/lists/create', $scope.formData)
	             .success(function (data){
	                $scope.formData = {};
	                $scope.lists = data;
	             })
	             .error(function (data){
	                 console.log('Error: ' +  data);
	             });
	    };

	    //Show a list's content
	    $scope.showList = function(id){
	    	// $http.get('api/list/' + id)
	    	$http.get('api/list/' + id)
	    		 .success(function (data){
	    		 	console.log('showing listId: '+id)
	    		 	$scope.lists = data
	    		 })
	    		 .error(function (data){
	    		     console.log('Error: ' +  data);
	    		 });
	    }

	    //Update existing list
	    $scope.updateList = function(id, updatedName){
	        $http.post('api/lists/edit/' + id, {name: updatedName})
	             .success(function (data){
	                $scope.lists = data;
	             })
	             .error(function (data){
	                 console.log('Error: ' +  data);
	             });
	    }

	    //Delete an existing list  
	    $scope.deleteList = function(id){
	        $http.post('api/lists/delete/' + id)
	             .success(function (data){
	                $scope.lists = data;
	             })
	             .error(function (data){
	                 console.log('Error: ' +  data);
	             });
	    }

	});
})();