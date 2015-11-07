(function() {
  'use strict';

  angular
    .module('travelNg')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/admin/tours', {
        templateUrl: 'app/admin/tours/index.html',
        controller: 'AdminToursController'
      })
      .when('/admin/countries', {
        templateUrl: 'app/admin/countries/index.html',
        controller: 'CountriesController'
      })
      .when('/admin/places', {
        templateUrl: 'app/admin/places/index.html',
        controller: 'PlacesController'
      })
      .when('/admin/hotels', {
        templateUrl: 'app/admin/hotels/index.html',
        controller: 'HotelsController'
      })
      .when('/tours', {
        templateUrl: 'app/tours/index.html',
        controller: 'ToursController'
      })
      .when('/tours/:slug', {
        templateUrl: 'app/tours/show.html',
        controller: 'TourController'
      })
      .otherwise({
        redirectTo: '/tours'
      });
  }
})();
