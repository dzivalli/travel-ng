(function() {
  'use strict';

  angular
    .module('travelNg')
    .controller('ToursController', ToursController);

  function ToursController($scope, $resource) {
    var parseResult = function(data) {
      data = angular.fromJson(data);
      return data.results
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

    $scope.showNewForm = false;
    $scope.tours = Tour.query();
    $scope.countries = Country.query();

    $scope.addTour = function() {
      var pointer = countryPointer($scope.newTour.countryObjectId);
      var mergedTour = angular.extend($scope.newTour, pointer);

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
      var pointer = countryPointer($scope.editedTour.countryObjectId);
      var mergedTour = angular.extend($scope.editedTour, pointer);

      Tour.update(serializeTour(mergedTour), function() {
        $scope.tours[index] = angular.copy($scope.editedTour);
        $scope.tours[index].edit = false;
      });
    };

    $scope.cancelTour = function(){
      $scope.showNewForm = false;
      $scope.newTour = {};
    };

    $scope.countryByObjectId = function(objectId) {
      var country = {name: ''};

      angular.forEach($scope.countries, function(val) {
        if (val.objectId === objectId) {
          country =  val
        }
      });

      return country
    };

    var countryPointer = function(objectId) {
      if (objectId) {
        return {
          country: {
            "__type":"Pointer",
            "className":"Country",
            "objectId": objectId
          }
        }
      } else {
        return {}
      }

    };

    var serializeTour = function(tour) {
      delete tour.edit;
      delete tour.countryObjectId;
      return tour
    }
  }
})();
