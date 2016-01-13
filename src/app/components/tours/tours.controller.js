(function() {
  'use strict';

  angular
    .module('travelNg')
    .controller('ToursController', ToursController);

  function ToursController($scope, Tour, Country, Place, Hotel, _, itemsOnPage) {
    $scope.filterObj = {country: {}, place: {}};
    $scope.startItem ;
    $scope.itemsOnPage = itemsOnPage;

    Tour.query(function(data){
      $scope.selectedTours = data;
    });

    $scope.countries = Country.query();
    var hotels = Hotel.query();
    $scope.places = Place.query();


    $scope.getPlace = function(objectId) {
      return _.find($scope.places, { objectId: objectId });
    };

    $scope.getCountry = function(objectId) {
      return _.find($scope.countries, { objectId: objectId });
    };

    $scope.getHotelByTourId = function(objectId) {
      return _.find(hotels, {tour: {objectId: objectId}});
    };
  }
})();
