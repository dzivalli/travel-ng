(function() {
  'use strict';

  angular
    .module('travelNg')
    .controller('ToursController', ToursController);

  function ToursController($scope, Tour, Country, Place, Hotel, search, _) {

    var tours = Tour.query(function(data){
      $scope.selectedTours = data;
    });

    $scope.countries = Country.query();
    var hotels = Hotel.query();
    var places = Place.query();


    $scope.getPlace = function(objectId) {
      return _.find(places, { objectId: objectId });
    };

    $scope.getCountry = function(objectId) {
      return _.find($scope.countries, { objectId: objectId });
    };

    $scope.getHotelByTourId = function(objectId) {
      return _.find(hotels, {tour: {objectId: objectId}});
    };

    $scope.selectCountry = function() {
      $scope.placesByCountry = search.selectPlacesByCountry(places, $scope.country);
      $scope.selectedTours = search.selectToursByCountry(tours, $scope.country);
    };

    $scope.selectPlace = function() {
      $scope.selectedTours = search.selectToursByCountryAndPlace(tours, $scope.country, $scope.place);
    };
  }
})();
