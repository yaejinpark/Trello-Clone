(function() {
	'use strict';

	angular
	.module('mytodo')
	.controller('TodoController', TodoController)

	TodoController.$inject = ['$log','$routeParams','TodoService']
	function TodoController ($log, $routeParams, TodoService) {
		var vm = this;

		//List of todos (with their listId)
		vm.getTodos = function (listId) {
			TodoService.getTodos(listId)
			.then(function (data) {
				vm.todos = data;
			})
			.catch(function (err) {
				$log.error('Error: ' + err);
			})
		}

		//Create a new todo item
		vm.createTodo = function(listId){
			TodoService.createTodo(listId, vm.formData)
			.then(function (data) {
				vm.todos.push(data);
			})
			.catch(function (err) {
				$log.error('Error: ' + err);
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
				$log.error('Error: ' + err);
			})
		}

		//Update existing todo item
		vm.updateTodo = function(id, updatedName){
			TodoService.updateTodo(id, updatedName)
			.then(function () {
				$log.error('Item updated to: ', updatedName);
			})
			.catch(function (err) {
				$log.error('Error: ' + err);
			})
		}
	}

})();
