(function() {
  'use strict';

  angular
    .module('travelNg')
    .directive('tourFilterBy', tourFilterBy);

  function tourFilterBy() {
    return {
      restrict: 'A',
      require: '^tourFilter',
      scope: {
        filterBy: '=tourFilterBy'
      },
      link: function(scope, element, attrs, tourFilterCtrl) {
        element.on('click', function() {
          scope.$apply(function() {
            tourFilterCtrl.filterBy(scope.filterBy);
          });
        });
      }
    };
  }
})();
