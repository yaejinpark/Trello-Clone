(function() {
	'use strict';

	angular
	.module('mytodo')
	.controller('BoardController', function ($scope, $http) {
		$scope.boards = [];
		$scope.formData = {};
		$http.get('api/boards')
			 .success(function (data) {
				 $scope.boards = data;
			 })
			 .error(function (data){
			     console.log('Error: ' +  data);
			 });

		//Create a new Board
		$scope.createBoard = function(){
		    $http.post('api/boards/create', $scope.formData)
		         .success(function (data){
		            $scope.formData = {};
		            $scope.boards = data;
		         })
		         .error(function (data){
		             console.log('Error: ' +  data);
		         });
		};

		//Show a list's content
		$scope.showBoard = function(id){
			$http.get('api/board' + id)
				 .success(function (data){
				 	$scope.boards = data
				 })
				 .error(function (data){
				     console.log('Error: ' +  data);
				 });
		}

		//Update existing list
		$scope.updateBoard = function(id, updatedName){
         	console.log(updatedName);
         	console.log(id);
		    $http.post('api/boards/edit/' + id, {name: updatedName})
		         .success(function (data){
		            $scope.boards = data;
		            console.log($scope.boards);
		         })
		         .error(function (data){
		             console.log('Error: ' +  data);
		         });
		}

		//Delete a todo item    
		$scope.deleteBoard = function(id){
		    $http.post('api/boards/delete/' + id)
		         .success(function (data){
		            $scope.boards = data;
		         })
		         .error(function (data){
		             console.log('Error: ' +  data);
		         });
		}
	})
})();