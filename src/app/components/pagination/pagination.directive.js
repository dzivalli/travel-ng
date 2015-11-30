(function() {
  'use strict';

  angular
    .module('travelNg')
    .directive('dzPagination', function(_, itemsOnPage) {
      var link = function(scope) {
        var allItems = null;
        scope.localChanges = false;

        scope.page = function(index) {
          var first = index * itemsOnPage;
          var last = first + itemsOnPage;

          scope.localChanges = true;
          scope.items = allItems.slice(first, last);
          scope.activePage = index;
        };

        scope.$watch('items', function() {
          if (scope.items && !scope.localChanges) {
            var rangeMax = Math.ceil(scope.items.length / itemsOnPage);

            allItems = scope.items;
            scope.itemsRange = _.range(rangeMax);
            scope.page(0);
          } else {
            scope.localChanges = false;
          }
        });
      };

      return {
        templateUrl: 'app/components/pagination/index.html',
        restrict: 'E',
        scope: {
          items: '='
        },
        link: link
      };
    });
})();
