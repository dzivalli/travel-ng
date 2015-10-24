(function() {
  'use strict';

  angular
    .module('travelNg')
    .config(routeConfig)
    .config(httpConfig)
    .config(locationConfig);

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

  function httpConfig($httpProvider) {
    $httpProvider.defaults.headers.common = {
      'X-Parse-Application-Id': 'P3yrQQP1Ski2sA6eMuEcXLTugsntCXkDdhseyk13',
      'X-Parse-REST-API-Key': 'MHnGP58WItHoXAJOpyiAh71gZQfJPEnabHcnbps5'
    }
  }

  function locationConfig($locationProvider) {
    $locationProvider.html5Mode(true);
  }

})();
