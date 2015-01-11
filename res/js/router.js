angular.module('router', [])

.config(function($locationProvider, $routeProvider) {
  $locationProvider.html5Mode(true);
    $routeProvider.when('/', {
       templateUrl: 'partials/home.html', 
       controller: HomeCtrl
    });

    $routeProvider.when('/tags/:tagId', {
        templateUrl: 'partials/result.html', 
        controller: TagResultCtrl
    });
});