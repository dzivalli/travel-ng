(function() {
  'use strict';

  angular
    .module('travelNg')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
