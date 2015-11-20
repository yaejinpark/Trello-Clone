(function() {
	'use strict';

	angular
	.module('mytodo')
	.controller('ListController', ListController);

	ListController.$inject = ['$log','$routeParams','ListService']
	function ListController ($log, $routeParams, ListService) {
		var vm = this;
		vm.lists = [];
		vm.formData = {};
		var boardId = $routeParams.boardId;
		vm.formData._boardid = boardId;

		//List of lists (With their boardId)
		ListService.getLists(boardId)
		.then(function (data) {
			vm.lists = data;
		})
		.catch(function (err) {
			$log.debug('Error: ' + err);
		})

		//Create a new list   
		vm.createList = function(){
			ListService.createList(vm.formData._boardid, vm.formData)
			.then(function (data) {
				vm.lists.push(data);
			})
			.catch(function (err) {
				$log.debug('Error: ' + err);
			})
		};

		//Show a list's content
		vm.showList = function(id){
			ListService.showList(id)
			.then(function (data) {
				vm.lists = data;
			})
			.catch(function (err) {
				$log.debug('Error: ' + err);
			})
		}

		//Delete an existing list
		vm.deleteList = function(id){
			ListService.deleteList(id)
			.then(function (data) {
				for (var i = 0; i < vm.lists.length; i++){
					if (vm.lists[i]._id == data._id){
						vm.lists.splice(i, 1);
						break;
					}
				}
			})
			.catch(function (err) {
				$log.debug('Error: ' + err);
			})
		}

		//Update existing list
		vm.updateList = function(id, updatedName){
			ListService.updateList(id, updatedName)
			.then(function () {
				$log.debug('List name updated to: ', updatedName);
			})
			.catch(function (err) {
				$log.debug('Error: ' + err);
			})
		}
	}
})();