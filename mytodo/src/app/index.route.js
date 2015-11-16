(function() {
  'use strict';

  angular
    .module('mytodo')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'app/user/signin.html',
      controller: 'UserController',
      controllerAs: 'user'
    })
    .otherwise({
      redirectTo: '/'
    });

    $routeProvider
    .when('/users', {
      templateUrl: 'app/user/signup.html',
      controller: 'UserController',
      controllerAs: 'user'
    })
    .otherwise({
      redirectTo: '/'
    });

    $routeProvider
    .when('/boards', {
      templateUrl: 'app/board/board.html',
      controller: 'BoardController',
      controllerAs: 'board'
    })
    .otherwise({
      redirectTo: '/'
    });

    $routeProvider
    .when('/lists', {
      templateUrl: 'app/list/list.html',
      controller: 'ListController',
      controllerAs: 'list'
    })
    .otherwise({
      redirectTo: '/'
    });

    $routeProvider
    .when('/todos', {
      templateUrl: 'app/todo/todo.html',
      controller: 'TodoController',
      controllerAs: 'todoCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
  }
})();
