(function() {
  'use strict';

  angular
    .module('travelNg')
    .controller('TourController', TourController);

  function TourController($scope, $routeParams, Country, Place, Hotel, parseCom, ToursCollection) {
    $scope.tour = ToursCollection.get($routeParams.slug);

    $scope.tour.$deferred.promise.then(function() {
      $scope.country = Country.get({objectId: $scope.tour.country.objectId});
      $scope.place = Place.get({objectId: $scope.tour.place.objectId});
      Hotel.get(parseCom.objectByTour($scope.tour.objectId), function(data) {
        $scope.hotel = data.results[0];
      });
    });
  }
})();
