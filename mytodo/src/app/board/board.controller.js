(function() {
	'use strict';

	angular
	.module('mytodo')
	.controller('BoardController', ['$routeParams','BoardService', function ($routeParams, BoardService) {
		var vm = this;
	    vm.boards = [];
	    vm.formData = {};
	    var userId = $routeParams.userId;
	    vm.formData._userid = userId;

	    //List of Boards (with their userId)
	    BoardService.getBoards(userId)
	    .then(function (data) {
	    	vm.boards = data;
	    })
	    .catch(function (err) {
            console.log('Error: ' + err);
        })

		//Create a new Board
		vm.createBoard = function(){
	    	BoardService.createBoard(vm.formData._userid, vm.formData)
	        .then(function (data) {
	            vm.boards.push(data);
	        })
	        .catch(function (err) {
	            console.log('Error: ' + err);
	        })
		};

		//Show a board's content
		vm.showBoard = function(id){
	    	BoardService.showBoard(id)
		    .then(function (data) {
		    	vm.boards = data;
		    })
		    .catch(function (err) {
	            console.log('Error: ' + err);
	        })
	    }

		//Delete an existing board    
		vm.deleteBoard = function(id){
		    BoardService.deleteBoard(id)
	    	.then(function (data) {
	    		var index = vm.boards.indexOf(data);
	    		vm.boards.splice(index, 1);
	    	})
	    	.catch(function (err) {
                console.log('Error: ' + err);
            })
		}

	    //Update an existing board
	    vm.updateBoard = function(id, updatedName){
	        BoardService.updateBoard(id, updatedName)
	        .then(function (data) {
	            console.log('Board name updated to: ', updatedName);
	        })
            .catch(function (err) {
                console.log('Error: ' + err);
            })
	    }
	}]);
})();