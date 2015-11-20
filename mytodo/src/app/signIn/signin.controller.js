(function () {
	'use strict';

	angular
	.module('mytodo')
	.controller('SigninController', ['$location', 'AuthService', 
	function ($location, AuthService) {
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
					$location.path('/boards');
				} else {
					vm.dataLoading = false;
				}
			});
		};

	}]);

})();