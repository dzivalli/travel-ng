(function() {
  'use strict';

  angular
    .module('travelNg')
    .controller('ToursController', ToursController);

  function ToursController($scope, $resource) {
    var parseResult = function(data) {
      data = angular.fromJson(data);
      return data.results;
    };

    var Tour = $resource(
      'https://api.parse.com/1/classes/Tour/:objectId',
      { objectId: '@objectId' },
      {query: { isArray: true, transformResponse: parseResult }}
    );

    var Country = $resource(
      'https://api.parse.com/1/classes/Country/:objectId',
      { objectId: '@objectId' },
      {query: { isArray: true, transformResponse: parseResult }}
    );

    var Place = $resource(
      'https://api.parse.com/1/classes/Place/:objectId',
      { objectId: '@objectId' },
      {query: { isArray: true, transformResponse: parseResult }}
    );

    $scope.tours = Tour.query(function(data){
      $scope.selectedTours = data;
    });

    $scope.countries = Country.query();
    $scope.places = Place.query();

    $scope.objectByObjectId = function(objectsList, objectId) {
      var obj = {};

      angular.forEach(objectsList, function(val) {
        if (val.objectId === objectId) {
          obj = val;
        }
      });
      return obj;
    };

    $scope.toursBy = function(objectName) {
      var tours = [];

      if ($scope.chosenItem === '') {
        $scope.selectedTours = $scope.tours;
      } else {
        angular.forEach($scope.tours, function(val) {
          if (val[objectName] && (val[objectName].objectId === $scope.chosenItem)) {
            tours.push(val);
          }
        });

        $scope.selectedTours = tours;
      }
    };
  }
})();
