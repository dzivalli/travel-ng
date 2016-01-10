(function() {
  'use strict';

  angular
    .module('travelNg')
    .directive('dzNavbar', dzNavbar);

  function dzNavbar() {
    return {
      templateUrl: 'app/components/admin/navbar/index.html',
      restrict: 'E',
      scope: {
        tab: '@'
      },
      link: function(scope) {
        scope.isActive = function(tabName) {
          return scope.tab === tabName;
        };
      }
    }
  }
})();
