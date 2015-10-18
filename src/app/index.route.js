(function() {
  'use strict';

  angular
    .module('travelNg')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/tour/index.html',
        controller: 'TourController',
        controllerAs: 'TourCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
