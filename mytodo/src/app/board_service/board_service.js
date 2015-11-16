(function() {
	'use strict';

	angular
	.module('mytodo')
	.factory('BoardService', ['$http','$q', function ($http, $q) {
		var service = {};

		service.getBoards = function(userId) {
	    	var deferred = $q.defer();
			$http.get('api/boards?userId=' + userId)
				 .success(function (data) {
				 	deferred.resolve(data);
				 })
				 .error(function (data){
				 	deferred.reject('Error: ' + data);
				    console.log('Error: ' +  data);
				 });
				 return deferred.promise;
	    }

		//Create a new Board
		service.createBoard = function(formData){
			var deferred = $q.defer();
		    $http.post('api/boards/create', formData)
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

		//Show a board's content
		service.showBoard = function(id){
	    	var deferred = $q.defer();
	    	$http.get('api/board/' + id)
	    		 .success(function (data){
	    		 	deferred.resolve(data);
	    		 })
	    		 .error(function (data){
	    		     console.log('Error: ' +  data);
	    		 });
	    		 return deferred.promise;
	    };

		//Delete a todo item    
		service.deleteBoard = function(id){
			var deferred = $q.defer();
		    $http.post('api/boards/delete/' + id)
		         .success(function (data){
		         	deferred.resolve(data);
		         })
		         .error(function (data){
		         	deferred.reject('Error: ' + data);
		            console.log('Error: ' +  data);
		         });
		         return deferred.promise;
		}

		//Update existing list
		service.updateBoard = function(id, updatedName){
			var deferred = $q.defer();
		    $http.post('api/boards/edit/' + id, {name: updatedName})
		         .success(function (data){
		         	deferred.resolve(data);
		         })
		         .error(function (data){
		         	deferred.reject('Error: ' + data);
		            console.log('Error: ' +  data);
		         });
		         return deferred.promise;
		}
		return service;
	}]);
})();