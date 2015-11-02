(function() {
  'use strict';

  angular
    .module('travelNg')
    .controller('ToursController', ToursController);

  function ToursController($scope, Tour, Country, Place) {

    var tours = Tour.query(function(data){
      $scope.selectedTours = data;
    });

    $scope.countries = Country.query();

    var places = Place.query();


    $scope.getPlace = function(objectId) {
      return _.find(places, { objectId: objectId });
    };

    $scope.getCountry = function(objectId) {
      return _.find($scope.countries, { objectId: objectId });
    };

    $scope.selectCountry = function() {
      if ($scope.country) {
        $scope.placesByCountry = _.where(places, {country: {objectId: $scope.country.objectId}});
        $scope.selectedTours = _.where(tours, {country: {objectId: $scope.country.objectId}})
      } else {
        $scope.placesByCountry = {};
        $scope.selectedTours = tours;
      }
    };

    $scope.selectPlace = function() {
      if ($scope.place) {
        $scope.selectedTours = _.where(
          tours,
          {
            country: { objectId: $scope.country.objectId },
            place: { objectId: $scope.place.objectId }
          }
        )
      } else {
        $scope.selectedTours = _.where(tours, {country: {objectId: $scope.country.objectId}})
      }
    }
  }
})();
