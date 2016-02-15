(function() {
  'use strict';

  angular
    .module('travelNg')
    .controller('ToursController', ToursController);

  function ToursController($scope, ToursCollection, Country, Place, Hotel, _, itemsOnPage) {
    $scope.filterObj = {country: {}, place: {}};
    $scope.startItem;
    $scope.itemsOnPage = itemsOnPage;
    $scope.selectedTours = ToursCollection.all();
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
