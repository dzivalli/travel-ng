(function() {
  'use strict';

  angular
    .module('travelNg')
    .controller('AdminToursController', AdminToursController);

  function AdminToursController($scope, Tour, Country, Place, parseCom) {
    $scope.showNewForm = false;
    $scope.tours = Tour.query();
    $scope.countries = Country.query();
    var places = Place.query();

    $scope.addTour = function() {
      var tour = angular.copy($scope.newTour);
      tour.country = parseCom.pointer($scope.newTour.country.objectId, 'country');
      tour.place = parseCom.pointer($scope.newTour.place.objectId, 'place');
      delete tour.edit;

      Tour.save(tour, function() {
        $scope.showNewForm = false;
        $scope.tours.push(tour);
        $scope.newTour = {};
      });
    };

    $scope.deleteTour = function(index) {
      Tour.delete({objectId: $scope.tours[index].objectId}, function() {
        $scope.tours.splice(index, 1);
      });
    };

    $scope.editTour = function(index) {
      $scope.tours[index].edit = true;
      $scope.editedTour = angular.copy($scope.tours[index]);
    };

    $scope.saveTour = function(index) {
      var tour = angular.copy($scope.editedTour);
      tour.country = parseCom.pointer($scope.editedTour.country.objectId, 'country');
      tour.place = parseCom.pointer($scope.editedTour.place.objectId, 'place');
      delete tour.edit;

      Tour.update(tour, function() {
        $scope.tours[index] = angular.copy(tour);
        $scope.tours[index].edit = false;
      });
    };

    $scope.cancelTour = function(){
      $scope.showNewForm = false;
      $scope.newTour = {};
    };

    $scope.getPlace = function(objectId) {
      return _.find(places, { objectId: objectId });
    };

    $scope.getCountry = function(objectId) {
      return _.find($scope.countries, { objectId: objectId });
    };
    $scope.selectCountry = function(country) {
      if (country) {
        $scope.placesByCountry = _.where(places, {country: {objectId: country.objectId}});
      } else {
        $scope.placesByCountry = {};
      }
    };
  }
})();
