(function () {
	'use strict';

	angular
	.module('mytodo')
	.factory('AuthService', ['$http', '$cookieStore', '$rootScope', '$timeout',
	function ($http, $cookieStore, $rootScope, $timeout) {
		var service = {};

		service.signin = function(username, password, callback) {
			$http.post('/api/authenticate', {
				username: username,
				password: password
			})
			.success(function (response) {
				callback({username: username, token:response.token});
			});
		};

		service.setCredentials = function (username, token){
			$rootScope.globals = {
				currentUser: {
					username: username,
					token: token
				}
			};

			$http.defaults.headers.common['X-ACCESS-TOKEN'] = token;
			$cookieStore.put('globals', $rootScope.globals);
		};

		service.clearCredentials = function () {
			$rootScope.globals = {};
			$cookieStore.remove('globals');
			$http.defaults.headers.common.Authorization = 'Basic;'
		};
		return service;
	}])
})();