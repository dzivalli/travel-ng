(function() {
  'use strict';

  angular
    .module('travelNg')
    .controller('TourController', TourController);

  function TourController($scope, $routeParams, Tour, Country, Place, Hotel) {
    $scope.tour = Tour.get({objectId: $routeParams.slug}, function(data) {
      $scope.country = Country.get({objectId: data.country.objectId});
      $scope.place = Place.get({objectId: data.place.objectId});
      Hotel.get({where: {"tour":{"__type":"Pointer","className":"Tour","objectId":data.objectId}}}, function(data) {
        $scope.hotel = data.results[0];
      });
    });
  }
})();
