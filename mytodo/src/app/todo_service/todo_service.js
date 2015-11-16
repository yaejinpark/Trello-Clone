(function() {
  'use strict';

    angular
    .module('mytodo')
    .factory('TodoService',['$http','$q', function ($http, $q) {
        var service = {};

        service.getTodos = function(listId) {
            var deferred = $q.defer();
            $http.get('api/todos?listId=' + listId)
                .success(function (data){
                    deferred.resolve(data);
                })
                .error(function (data){
                    deferred.reject('Error: ' + data);
                    console.log('Error: ' +  data);
                });
                return deferred.promise;     
        }
      
        service.createTodo = function(formData) {
            var deferred = $q.defer();
            $http.post('api/todos/create/', formData)
                 .success(function (data){
                    formData = {};
                    deferred.resolve(data);
                 })
                 .error(function (data){
                    deferred.reject('Error: ' + data);
                    console.log('Error: ' +  data);
                 });
                 return deferred.promise;     
        }

        service.deleteTodo = function (id) {
            var deferred = $q.defer();
            $http.post('api/todos/delete/' + id)
                 .success(function (data){
                    deferred.resolve(data);
                 })
                 .error(function (data){
                    deferred.reject('Error: ' + data);
                    console.log('Error: ' +  data);
                 });
                 return deferred.promise;
        }

        service.updateTodo = function(id, updatedName){
            var deferred = $q.defer();
            $http.post('api/todos/edit/' + id, {name: updatedName})
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
