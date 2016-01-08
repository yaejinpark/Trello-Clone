(function() {
  'use strict';

  angular
    .module('mytodo')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'app/signIn/signin.html',
      controller: 'SigninController',
      controllerAs: 'signinCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });

    $routeProvider
    .when('/signup', {
      templateUrl: 'app/signUp/signup.html',
      controller: 'SignupController',
      controllerAs: 'signupCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });

    $routeProvider
    .when('/users', {
      templateUrl: 'app/user/user.html',
      controller: 'UserController',
      controllerAs: 'userCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });

    $routeProvider
    .when('/update-account', {
      templateUrl: 'app/update_account/update_account.html',
      controller: 'UserController'
    })
    .otherwise({
      redirectTo: '/'
    });

    $routeProvider
    .when('/boards', {
      templateUrl: 'app/board/board.html',
      controller: 'BoardController',
      controllerAs: 'boardCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });

    $routeProvider
    .when('/lists', {
      templateUrl: 'app/list/list.html',
      controller: 'ListController',
      controllerAs: 'listCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });

    $routeProvider
    .when('/home', {
      templateUrl: 'app/home/home.html',
    })
    .otherwise({
      redirectTo: '/'
    });
  }
})();
