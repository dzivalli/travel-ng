(function() {
  'use strict';

  angular
    .module('travelNg')
    .directive('tourFilter', function(search) {
      var link = function(scope) {
        scope.placesByCountry = {};

        scope.selectCountry = function() {
          scope.placesByCountry = search.selectPlacesByCountry(scope.places, scope.country);
          scope.sort({ country: scope.country, place: {} });
        };

        scope.selectPlace = function() {
          scope.sort({ country: scope.country, place: scope.place });
        };
      };

      return {
        templateUrl: 'app/components/filter/index.html',
        restrict: 'E',
        scope: {
          countries: '=',
          places: '=',
          sort: '&'
        },
        link: link
      };
    });
})();