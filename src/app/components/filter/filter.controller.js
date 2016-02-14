(function() {
  'use strict';

  angular
    .module('travelNg')
    .controller('tourFilterCtrl', tourFilterCtrl);

  function tourFilterCtrl($scope) {
    this.filterBy = function (object) {
      switch (object.className) {
        case 'Country':
          $scope.country = object;
          $scope.place = {};
          $scope.selectCountry();
          break;
        case 'Place':
          $scope.place = object;
          break;
      }
      $scope.selectPlace();
    }
  }
})();
