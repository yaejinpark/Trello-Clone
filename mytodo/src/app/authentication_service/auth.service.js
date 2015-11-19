(function () {
	'use strict';

	angular
	.module('mytodo')
	.factory('AuthService', ['$q','$http', '$cookieStore', '$rootScope', '$timeout',
	function ($q, $http, $cookieStore, $rootScope, $timeout) {
		var service = {};

		service.login = function(username, password, callback) {
			var deferred = $q.defer();
			$http.post('/api/authenticate', {
				username: username,
				password: password
			})
			.success(function (res) {
				callback({username: username, token:res.body.token});
			});
			return deferred.promise;
		};

		service.setCredentials = function (username, token){
			var deferred = $q.defer();
			$rootScope.globals = {
				currentUser: {
					username: username,
					token: token
				}
			};

			$http.defaults.headers.common['X-ACCESS-TOKEN'] = token;
			$cookieStore.put('globals', $rootScope.globals);

			return deferred.promise;
		};

		service.clearCredentials = function () {
			var deferred = $q.defer();
			$rootScope.globals = {};
			$cookieStore.remove('globals');
			$http.defaults.headers.common.Authorization = 'Basic;'

			return deferred.promise;
		};
		return service;
	}])
})();