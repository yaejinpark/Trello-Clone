(function() {
	'use strict';

	angular
	.module('mytodo')
	.controller('UserController', function ($scope, $http) {
		$scope.users = [];
		$scope.formData = {};
		$http.get('api/')
			 .success(function (data) {
				 $scope.users = data;
			 })
			 .error(function (data){
			     console.log('Error: ' +  data);
			 });

		//Create a new Board
		$scope.createUser = function(){
		    $http.post('api/users/create', $scope.formData)
		         .success(function (data){
		            $scope.formData = {};
		            $scope.users = data;
		         })
		         .error(function (data){
		             console.log('Error: ' +  data);
		         });
		};
	})
})();