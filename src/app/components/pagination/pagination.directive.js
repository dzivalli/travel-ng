(function() {
  'use strict';

  angular
    .module('travelNg')
    .directive('dzPagination', function(_, itemsOnPage) {
      var link = function(scope) {
        scope.page = function(index) {
          scope.startItem = index * itemsOnPage;
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
          startItem: '='
        },
        link: link
      };
    });
})();
