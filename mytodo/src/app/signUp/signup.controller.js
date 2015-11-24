(function () {
	'use strict';

	angular
	.module('mytodo')
	.controller('SignupController', SignupController)

	SignupController.$inject = ['$location', 'UserService']
	function SignupController ($location, UserService) {
		var vm = this;

		vm.signup = signup;

		function signup() {
			vm.dataLoading = true;
			UserService.createUser(vm.formData)
			.then(function (res){
				if (res.success) {
					$location.path('/signin');
				} else {
					vm.dataLoading = false;
				}
			});
		}

	}

})()