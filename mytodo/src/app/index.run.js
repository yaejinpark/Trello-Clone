(function() {
	'use strict';

	angular
	.module('mytodo')
	.run(loadAuth)
	.run(runBlock);

	loadAuth.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
	function loadAuth($rootScope, $location, $cookieStore, $http) {
		$rootScope.globals = $cookieStore.get('globals') || {};
		if ($rootScope.globals.currentUser) {
			$http.defaults.headers.common['X-ACCESS-TOKEN'] = $rootScope.globals.currentUser.token
		}

		$rootScope.$on('$locationChangeStart', function (event, next, current) {
			var restrictedPage = $.inArray($location.path(), ['/', '/users']) === -1;
			var signedIn = $rootScope.globals.currentUser;

			if (restrictedPage && !signedIn) {
				$location.path('/signin');
			}
		});
	}

/** @ngInject */
	function runBlock($log) {
		$log.debug('runBlock end');
	}

})();
