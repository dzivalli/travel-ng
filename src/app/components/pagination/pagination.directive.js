(function() {
  'use strict';

  angular
    .module('travelNg')
    .directive('dzPagination', function(_, itemsOnPage) {
      var link = function(scope) {
        scope.page = function(index) {
          var first = index * itemsOnPage;
          var last = first + itemsOnPage;

          scope.displayRange({ first: first, last: last });
          scope.activePage = index;
        };

        scope.$watch('itemsCount', function() {
          if (scope.itemsCount) {
            var rangeMax = Math.ceil(scope.itemsCount / itemsOnPage);

            scope.itemsRange = _.range(rangeMax);
            scope.page(0);
          }
        });
      };

      return {
        templateUrl: 'app/components/pagination/index.html',
        restrict: 'E',
        scope: {
          itemsCount: '@',
          displayRange: '&'
        },
        link: link
      };
    });
})();
