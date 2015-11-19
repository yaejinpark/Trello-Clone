(function() {
  'use strict';

    angular
    .module('mytodo')
    .controller('TodoController', ['$routeParams','TodoService', function ($routeParams, TodoService) {
        var vm = this;
        vm.todos = [];
        vm.formData = {};
        var listId = $routeParams.listId;
        vm.formData._listid = listId;

        //List of todos (with their listId)
        TodoService.getTodos(listId)
        .then(function (data) {
            vm.todos = data;
        })
        .catch(function (err) {
            console.log('Error: ' + err);
        })

        //Create a new todo item
        vm.createTodo = function(){
            TodoService.createTodo(vm.formData)
            .then(function (data) {
                vm.todos.push(data);
            })
            .catch(function (err) {
                console.log('Error: ' + err);
            })
        }
        //Delete a todo item    
        vm.deleteTodo = function(id){
            TodoService.deleteTodo(id)
            .then(function (data) {
                for (var i = 0; i < vm.todos.length; i++){
                    if (vm.todos[i]._id == data._id){
                        vm.todos.splice(i, 1);
                        break;
                    }
                }
            })
            .catch(function (err) {
                console.log('Error: ' + err);
            })
        }

        //Update existing todo item
        vm.updateTodo = function(id, updatedName){
            TodoService.updateTodo(id, updatedName)
            .then(function (data) {
                console.log('Item updated to: ', updatedName);
            })
            .catch(function (err) {
                console.log('Error: ' + err);
            })
        }
    }]);

})();
