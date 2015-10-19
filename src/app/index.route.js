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
      .when('/countries', {
        templateUrl: 'app/country/index.html',
        controller: 'CountryController'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
