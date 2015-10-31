(function() {
  'use strict';

  angular
    .module('travelNg')
    .controller('CountriesController', CountriesController);

  function CountriesController($scope, $resource) {
    var parseResult = function (data) {
      data = angular.fromJson(data);
      return data.results;
    };

    var Country = $resource(
      'https://api.parse.com/1/classes/Country/:objectId',
      { objectId: '@objectId' },
      {
        query: { isArray: true, transformResponse: parseResult },
        update: { method: 'PUT' }
      }
    );

    $scope.countries = Country.query();

    $scope.addCountry = function() {
      Country.save(serializeCountry($scope.newCountry), function() {
        $scope.countries.push(angular.copy($scope.newCountry));
        $scope.newCountry = {};
      });
    };

    $scope.deleteCountry = function(index) {
      Country.delete({objectId: $scope.countries[index].objectId}, function(index) {
        $scope.countries.splice(index, 1);
      });
    };

    $scope.editCountry = function(index) {
      $scope.countries[index].edit = true;
      $scope.editedCountry = $scope.countries[index];
    };

    $scope.saveCountry = function(index) {
      Country.update(serializeCountry($scope.editedCountry), function(){
        $scope.countries[index] = angular.copy($scope.editedCountry);
        $scope.countries[index].edit = false;
        $scope.editedCountry = {};
      });
    };

    var serializeCountry = function(country) {
      delete country.edit;
      return country;
    };
  }
})();
