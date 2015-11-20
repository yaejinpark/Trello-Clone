(function() {
	'use strict';

	describe('AuthService' ['$log', function ($log) {
		var service;

		//Configure module that contains the tested controller
		beforeEach(module('mytodo'));

		beforeEach(inject(function ($httpbackend, _AuthService_) {
			service = _AuthService_;
			$httpbackend = _$httpBackend_;
		}));

		afterEach(function () {
			// $httpbackend.verifyNoOutstandingExpectation();
			// $httpbackend.verifyNoOutstandingRequest();
		})

		//Test user signin
		// it('should let the user signin', function (done) {
		// 	$httpbackend.
		// 	service.signin({
		// 		username:'potato',
		// 		password:'password'
		// 	})
		// 	.then(function (data){
		// 		// console.log(token);
		// 		// token is not being logged
		// 		expect(data.username).toBe('potato')
		// 		//How do I see the token in the callback?
		// 		done();
		// 	})
		// 	.catch(function (error) {
		// 		$log.debug('Error: ', error);
		// 		done.fail(error);
		// 	})
		// });

		//Test setting credentials for user signin
		// it('should set credentials for user', function (done) {
		// 	service.setCredentials({

		// 	})
		// });

	}]);
})