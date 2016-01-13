(function() {
  'use strict';

  angular
    .module('travelNg')
    .directive('tourFilter', function(search) {
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
        scope: {
          countries: '=',
          places: '=',
          filterObj: '='
        },
        link: link
      };
    });
})();
