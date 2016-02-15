(function() {
  'use strict';

  angular
    .module('travelNg')
    .directive('tourFilter', tourFilter)
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

  function tourFilter(search) {
    var link = function(scope) {
      scope.placesByCountry = {};

      scope.selectCountry = function() {
        scope.placesByCountry = search.selectPlacesByCountry(scope.places, scope.country);
        scope.country ? scope.filterObj.country.objectId = scope.country.objectId : scope.filterObj.country = {};
      };

      scope.selectPlace = function() {
        scope.country && (scope.filterObj.country.objectId = scope.country.objectId);
        scope.place ? scope.filterObj.place.objectId = scope.place.objectId : scope.filterObj.place = {};
      };
    };

    return {
      templateUrl: 'app/components/filter/index.html',
      restrict: 'E',
      controller: 'tourFilterCtrl',
      transclude: true,
      scope: {
        countries: '=',
        places: '=',
        filterObj: '='
      },
      link: link
    };
  }
})();
