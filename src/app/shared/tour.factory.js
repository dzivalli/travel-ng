(function(){
  'use strict';

  angular
    .module('travelNg')
    .factory('Tour', tourFactory);

  function tourFactory(parseCom) {
    return parseCom.object('Tour');
  }
})();
