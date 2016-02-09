(function() {
  'use strict';

  angular
    .module('travelNg')
    .controller('AdminToursController', AdminToursController);

  function AdminToursController($scope, ToursCollection, Country, Place, parseCom, _) {
    $scope.showNewForm = false;
    $scope.tours = ToursCollection.all();
    $scope.countries = Country.query();
    var places = Place.query();

    $scope.addTour = function(newTour) {
      var tourParams = angular.copy(newTour);
      tourParams.country = parseCom.pointer(newTour.country.objectId, 'country');
      tourParams.place = parseCom.pointer(newTour.place.objectId, 'place');
      delete tourParams.edit;

      ToursCollection.save(tourParams).then(function(tour) {
        $scope.showNewForm = false;
        $scope.tours.push(tour);
      });
    };

    $scope.deleteTour = function(index) {
      ToursCollection.delete($scope.tours[index].objectId).then(function() {
        $scope.tours.splice(index, 1);
      });
    };

    $scope.editTour = function(index) {
      $scope.tours[index].edit = true;
      $scope.editedTour = angular.copy($scope.tours[index]);
    };

    $scope.saveTour = function(index) {
      var tourParams = angular.copy($scope.editedTour);
      tourParams.country = parseCom.pointer($scope.editedTour.country.objectId, 'country');
      tourParams.place = parseCom.pointer($scope.editedTour.place.objectId, 'place');
      delete tourParams.edit;

      ToursCollection.update(tourParams).then(function(updatedTour) {
        $scope.tours[index] = updatedTour;
        $scope.tours[index].edit = false;
      });
    };

    $scope.cancelTour = function(){
      $scope.showNewForm = false;
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
