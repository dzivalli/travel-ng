(function() {
  'use strict';

  angular
    .module('travelNg')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/admin/tours', {
        templateUrl: 'app/components/admin/tours/index.html',
        controller: 'AdminToursController'
      })
      .when('/admin/countries', {
        templateUrl: 'app/components/admin/countries/index.html',
        controller: 'CountriesController'
      })
      .when('/admin/places', {
        templateUrl: 'app/components/admin/places/index.html',
        controller: 'PlacesController'
      })
      .when('/admin/hotels', {
        templateUrl: 'app/components/admin/hotels/index.html',
        controller: 'HotelsController'
      })
      .when('/tours', {
        templateUrl: 'app/components/tours/index.html',
        controller: 'ToursController'
      })
      .when('/tours/:slug', {
        templateUrl: 'app/components/tours/show.html',
        controller: 'TourController'
      })
      .otherwise({
        redirectTo: '/tours'
      });
  }
})();
