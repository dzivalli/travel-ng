(function() {
  'use strict';

  angular
    .module('travelNg')
    .controller('AdminToursController', AdminToursController);

  function AdminToursController($scope, $resource) {
    var parseResult = function(data) {
      data = angular.fromJson(data);
      return data.results;
    };

    var Tour = $resource(
      'https://api.parse.com/1/classes/Tour/:objectId',
      { objectId: '@objectId' },
      {
        query: { isArray: true, transformResponse: parseResult },
        update: { method: 'PUT' }
      }
    );

    var Country = $resource(
      'https://api.parse.com/1/classes/Country/:objectId',
      { objectId: '@objectId' },
      { query: { isArray: true, transformResponse: parseResult } }
    );

    var Place = $resource(
      'https://api.parse.com/1/classes/Place/:objectId',
      { objectId: '@objectId' },
      { query: { isArray: true, transformResponse: parseResult } }
    );

    $scope.showNewForm = false;
    $scope.tours = Tour.query();
    $scope.countries = Country.query();
    $scope.places = Place.query();

    $scope.addTour = function() {
      var countryPointer = pointerObject($scope.newTour.countryObjectId, 'country');
      var placePointer = pointerObject($scope.newTour.placeObjectId, 'place');
      var mergedTour = angular.extend($scope.newTour, countryPointer, placePointer);
      console.log(mergedTour);

      Tour.save(serializeTour(mergedTour), function() {
        $scope.showNewForm = false;
        $scope.tours.push(angular.copy($scope.newTour));
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
      var countryPointer = pointerObject($scope.editedTour.countryObjectId, 'country');
      var placePointer = pointerObject($scope.editedTour.placeObjectId, 'place');
      var mergedTour = angular.extend($scope.editedTour, countryPointer, placePointer);

      Tour.update(serializeTour(mergedTour), function() {
        $scope.tours[index] = angular.copy($scope.editedTour);
        $scope.tours[index].edit = false;
      });
    };

    $scope.cancelTour = function(){
      $scope.showNewForm = false;
      $scope.newTour = {};
    };

    $scope.objectByObjectId = function(objectsList, objectId) {
      var obj = {};

      angular.forEach(objectsList, function(val) {
        if (val.objectId === objectId) {
          obj = val;
        }
      });
      return obj;
    };

    var pointerObject = function(objectId, className) {
      var obj = {};

      if (objectId) {
        obj[className] = {
          "__type":"Pointer",
          "className": capitalize(className),
          "objectId": objectId
        };

        return obj
      } else {
        return {};
      }

    };

    var capitalize = function(name) {
      return name.replace(/^./, name[0].toUpperCase());
    };

    var serializeTour = function(tour) {
      delete tour.edit;
      delete tour.countryObjectId;
      delete tour.placeObjectId;
      return tour;
    };
  }
})();
