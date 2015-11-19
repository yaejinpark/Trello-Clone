(function() {
	'use strict';

	angular
	.module('mytodo')
	.factory('UserService', ['$http','$q', function ($http, $q){
		var service = {};

		service.getUsers = function(){
			var deferred = $q.defer();
			$http.get('/api/users')
			    .success(function (data){
			    	deferred.resolve(data);
			    })
			    .error(function (data){
			    	deferred.reject('Error: ' + data);
			        console.log('Error: ' +  data);
			    });
			    return deferred.promise;
		};

		//Create a new user (sign up)
		service.createUser = function(formData){
			var deferred = $q.defer();
			$http.post('/api/users/create', formData)
				 .success(function (data){
				 	formData = {};
				 	deferred.resolve(data);
				 })
				 .error(function (data){
				 	deferred.reject('Error: ' + data);
				    console.log('Error: ' +  data);
				 });
				 return deferred.promise; 
		};

		//Show a user's information
		service.showUser = function(id){
			var deferred = $q.defer();
			$http.get('api/user/' + id)
				 .success(function (data){
				 	deferred.resovle(data);
				 })
				 .error(function (data){
				     console.log('Error: ' +  data);
				 });
				 return deferred.promise;
		};

		//Delete an existing user
		service.deleteUser = function(id){
			var deferred = $q.defer();
			$http.post('api/users/delete/' + id)
			     .success(function (data){
			     	deferred.resolve(data);
			     })
			     .error(function (data){
			     	deferred.reject('Error: ' + data);
			        console.log('Error: ' +  data);
			     });
			     return deferred.promise;

		};

		//Update an existing user's information
		service.updateUser = function(id, updatedPass, updatedEmail){
			var deferred = $q.defer();
		    $http.post('api/users/edit/' + id, {password: updatedPass}, {email: updatedEmail})
		         .success(function (data){
		         	deferred.resolve(data);
		         })
		         .error(function (data){
		         	deferred.reject('Error: ' + data);
		            console.log('Error: ' +  data);
		         });
		         return deferred.promise;
		};
		return service;
	}]);
})();