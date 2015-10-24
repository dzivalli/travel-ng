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

    $scope.tours = Tour.query(function(data){
      $scope.selectedTours = data;
    });

    $scope.countries = Country.query();

    $scope.countryByObjectId = function(objectId) {
      var country = {name: ''};

      angular.forEach($scope.countries, function(val) {
        if (val.objectId === objectId) {
          country =  val;
        }
      });

      return country;
    };

    $scope.toursByCountry = function() {
      var tours = [];

      if ($scope.chosenCountry === '') {
        $scope.selectedTours = $scope.tours;
      } else {
        angular.forEach($scope.tours, function(v) {
          if (v.country.objectId === $scope.chosenCountry) {
            tours.push(v);
          }
        });

        $scope.selectedTours = tours;
      }
    };
  }
})();
