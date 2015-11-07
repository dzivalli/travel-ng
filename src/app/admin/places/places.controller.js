(function() {
  'use strict';

  angular
    .module('travelNg')
    .controller('PlacesController', PlacesController);

  function PlacesController($scope, Place, Country, parseCom) {
    $scope.places = Place.query();
    $scope.countries = Country.query();

    $scope.addPlace = function() {
      var place = angular.copy($scope.newPlace);
      delete place.edit;
      place.country = parseCom.pointer(place.country.objectId, 'country');

      Place.save(place, function() {
        $scope.places.push(place);
        $scope.newPlace = {};
      });
    };

    $scope.getCountry = function(objectId) {
      return _.find($scope.countries, { objectId: objectId})
    };

    $scope.deletePlace = function(index) {
      Place.delete({objectId: $scope.places[index].objectId}, function(index) {
        $scope.places.splice(index, 1);
      });
    };

    $scope.editPlace = function(index) {
      $scope.places[index].edit = true;
      $scope.editedPlace = $scope.places[index];
    };

    $scope.savePlace = function(index) {
      var place = angular.copy($scope.editedPlace);
      delete place.edit;
      place.country = parseCom.pointer(place.country.objectId, 'country');

      Place.update(place, function(){
        $scope.places[index] = place;
        $scope.places[index].edit = false;
        $scope.editedPlace = {};
      });
    };
  }
})();
