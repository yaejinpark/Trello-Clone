(function () {
	'use strict';

	angular
	.module('mytodo')
	.controller('SigninController', SigninController)

	SigninController.$inject = ['$location', 'AuthService']
	function SigninController ($location, AuthService) {
		var vm = this;

		vm.signin = signin;

		(function initController() {
			//reset login status
			AuthService.clearCredentials();
		})();

		function signin() {
			vm.dataLoading = true;
			AuthService.signin(vm.username, vm.password, function (credentials) {
				if (credentials) {
					AuthService.setCredentials(credentials.username, credentials.token);
					$location.path('/users');
				} else {
					vm.dataLoading = false;
				}
			});
		}
	}

})();