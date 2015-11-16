(function() {
	'use strict';

	angular
	.module('mytodo')
	.controller('ListController', ['$routeParams','ListService', function ($routeParams, ListService) {
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
            console.log('Error: ' + err);
        })
	    
	    //Create a new list   
	    vm.createList = function(){
	    	ListService.createList(vm.formData)
	        .then(function (data) {
	            vm.lists.push(data);
	        })
	        .catch(function (err) {
	            console.log('Error: ' + err);
	        })
	    };

	    //Show a list's content
	    vm.showList = function(id){
	    	ListService.showList(id)
		    .then(function (data) {
		    	vm.lists = data;
		    })
		    .catch(function (err) {
	            console.log('Error: ' + err);
	        })
	    }

	    //Delete an existing list
	    vm.deleteList = function(id){
	    	ListService.deleteList(id)
	    	.then(function (data) {
	    		console.log(data);
	    		var index = vm.lists.indexOf(data);
	    		vm.lists.splice(index, 1);
	    	})
	    	.catch(function (err) {
                console.log('Error: ' + err);
            })
	    }

	    //Update existing list
	    vm.updateList = function(id, updatedName){
	        ListService.updateList(id, updatedName)
	        .then(function (data) {
	            console.log('List name updated to: ', updatedName);
	        })
            .catch(function (err) {
                console.log('Error: ' + err);
            })
	    }
	}]);
})();