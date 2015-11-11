(function() {
  'use strict';

    angular
    .module('mytodo')
    .controller('TodoController', function ($scope, $routeParams, $http) {
        $scope.todos = [];
        $scope.formData = {};
        $scope.listId = $routeParams.listId;
        $http.get('api/todos?listId=' + $scope.listId)
            .success(function (data){
                $scope.todos = data;
            })
            .error(function (data){
                console.log('Error: ' +  data);
            });

        //Create a new todo item    
        $scope.createTodo = function(){
            $scope.formData['_listid'] = $scope.listId;
            //instead of adding it to the html, pass the list Id here
            $http.post('api/todos/create/', $scope.formData)
                 .success(function (data){
                    $scope.formData = {};
                    $scope.todos = data;
                 })
                 .error(function (data){
                     console.log('Error: ' +  data);
                 });
        }

        //Delete a todo item    
        $scope.deleteTodo = function(id){
            $http.post('api/todos/delete/' + id)
                 .success(function (data){
                    $scope.todos = data;
                 })
                 .error(function (data){
                     console.log('Error: ' +  data);
                 });
        }

        //Update existing todo item
        $scope.updateTodo = function(id, updatedName){
            $http.post('api/todos/edit/' + id, {name: updatedName})
                 .success(function (data){
                    $scope.todos = data;
                 })
                 .error(function (data){
                     console.log('Error: ' +  data);
                 });
        }
    });

})();
