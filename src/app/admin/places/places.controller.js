(function() {
  'use strict';

  angular
    .module('travelNg')
    .controller('PlacesController', PlacesController);

  function PlacesController($scope, $resource) {
    var parseResult = function (data, headersGetter) {
      data = angular.fromJson(data);
      return data.results;
    };

    var Place = new $resource(
      'https://api.parse.com/1/classes/Place/:objectId',
      { objectId: '@objectId' },
      {
        query: { isArray: true, transformResponse: parseResult },
        update: { method: 'PUT' }
      }
    );

    $scope.places = Place.query();

    $scope.addPlace = function() {
      Place.save(serializePlace($scope.newPlace), function() {
        $scope.places.push(angular.copy($scope.newPlace));
        $scope.newPlace = {};
      });
    };

    $scope.deletePlace = function(index) {
      Place.delete({objectId: $scope.places[index].objectId}, function(index) {
        $scope.places.splice(index, 1);
      })
    };

    $scope.editPlace = function(index) {
      $scope.places[index].edit = true;
      $scope.editedPlace = $scope.places[index];
    };

    $scope.savePlace = function(index) {
      Place.update(serializePlace($scope.editedPlace), function(){
        $scope.places[index] = angular.copy($scope.editedPlace);
        $scope.places[index].edit = false;
        $scope.editedPlace = {};
      });
    };

    var serializePlace = function(place) {
      delete place.edit;
      return place
    }
  }
})();
