(function() {
  'use strict';

  angular
    .module('travelNg')
    .controller('CountryController', CountryController);

  function CountryController($scope) {
    $scope.countries = [];

    $scope.addCountry = function() {
      $scope.countries.push(angular.copy($scope.newCountry));
      $scope.newCountry = {};
    };

    $scope.deleteCountry = function(index) {
      $scope.countries.splice(index, 1);
    };

    $scope.editCountry = function(index) {
      $scope.countries[index].edit = true;
      $scope.editedCountry = $scope.countries[index];
    };

    $scope.saveCountry = function(index) {
      $scope.countries[index] = angular.copy($scope.editedCountry);
      $scope.countries[index].edit = false;
      $scope.editedCountry = {};
    };
  }

})();
