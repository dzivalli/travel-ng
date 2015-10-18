(function() {
  'use strict';

  angular
    .module('travelNg')
    .controller('TourController', TourController);

  function TourController($scope) {
    $scope.showNewForm = false;

    $scope.addTour = function() {
      $scope.showNewForm = false;
      $scope.tours.push(angular.copy($scope.newTour));
    };

    $scope.deleteTour = function(index) {
      $scope.tours.splice(index, 1);
    };

    $scope.editTour = function(index) {
      $scope.tours[index].edit = true;
      $scope.editedTour = angular.copy($scope.tours[index]);
    };

    $scope.saveTour = function(index) {
      $scope.tours[index] = angular.copy($scope.editedTour);
      $scope.tours[index].edit = false;
    };
  }
})();
