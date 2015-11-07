(function() {
  'use strict';

  angular
    .module('travelNg')
    .controller('TourController', TourController);

  function TourController($scope, $routeParams, Tour, Country, Place, Hotel, parseCom) {
    $scope.tour = Tour.get({objectId: $routeParams.slug}, function(data) {
      $scope.country = Country.get({objectId: data.country.objectId});
      $scope.place = Place.get({objectId: data.place.objectId});
      Hotel.get(parseCom.objectByTour(data.objectId), function(data) {
        $scope.hotel = data.results[0];
      });
    });
  }
})();
