(function() {
	'use strict';

	angular
	.module('mytodo')
	.controller('UserController', UserController)

	UserController.$inject = ['$log','$routeParams','UserService']
	function UserController ($log, $routeParams, UserService) {
		var vm = this;
		vm.users = [];
		vm.formData = {};

		//List of Users
		vm.getUsers = function() {
			UserService.getUsers()
			.then(function (data) {
				vm.users = data;
			})
			.catch(function (err) {
				$log.error('Error: ', err);
			})

		}

		//Create a new User
		vm.createUser = function(){
			UserService.createUser(vm.formData)
			.then(function (data) {
				vm.users.push(data);
			})
			.catch(function (err) {
				$log.error('Error: ', err);
			})
		};

		//Show an existing user
		vm.showUser = function(id) {
			UserService.showUser(id)
			.then(function (data) {
				vm.users = data;
			})
			.catch(function (err) {
				$log.error('Error: ', err);
			})
		};

		//Delete an existing user
		vm.deleteUser = function(id) {
			UserService.deleteUser(id)
			.then(function (data) {
				for (var i = 0; i < vm.users.length; i++){
					if (vm.users[i]._id == data._id){
						vm.users.splice(i, 1);
						break;
					}
				}
			})
			.catch(function (err) {
				$log.error('Error: ', err);
			})
		};

		//Update an existing user
		vm.updateUser = function(id, updatedPass, updatedEmail) {
			UserService.updateUser(id, updatedPass, updatedEmail)
			.then(function () {
				$log.error('User information update successful!');
			})
			.catch(function (err) {
				$log.error('Error: ', err);
			})
		};
	}
})();