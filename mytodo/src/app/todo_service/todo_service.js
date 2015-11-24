(function() {
	'use strict';

	angular
	.module('mytodo')
	.factory('TodoService', TodoService)

	TodoService.$inject = ['$log','$http','$q']
	function TodoService ($log, $http, $q) {
		var service = {};

		//Show Todos with same listId
		service.getTodos = function(listId) {
			var deferred = $q.defer();
			$http.get('api/todos?listId=' + listId)
				.success(function (data){
					deferred.resolve(data);
				})
				.error(function (data){
					deferred.reject('Error: ' + data);
					$log.debug('Error: ' +  data);
				});
				return deferred.promise;     
		}

		//Create a new todo item
		service.createTodo = function(listId,formData) {
			var deferred = $q.defer();
			$http.post('api/todos/'+listId, formData)
				.success(function (data){
					formData = {};
					deferred.resolve(data);
				})
				.error(function (data){
					deferred.reject('Error: ' + data);
					$log.debug('Error: ' +  data);
				});
				return deferred.promise;     
		}

		//Delete an existing todo item
		service.deleteTodo = function (id) {
			var deferred = $q.defer();
			$http.post('api/todos/delete/' + id)
				.success(function (data){
					deferred.resolve(data);
				})
				.error(function (data){
					deferred.reject('Error: ' + data);
					$log.debug('Error: ' +  data);
				});
				return deferred.promise;
		}

		//Update an existing todo item
		service.updateTodo = function(id, updatedName){
			var deferred = $q.defer();
			$http.post('api/todos/edit/' + id, {name: updatedName})
				.success(function (data){
					deferred.resolve(data);
				})
				.error(function (data){
					deferred.reject('Error: ' + data);
					$log.debug('Error: ' +  data);
				});
				return deferred.promise;
		}
		return service;
	}
})();
