(function() {
  'use strict';

  angular
    .module('travelNg')
    .factory('Country', countryFactory);

  function countryFactory(parseCom) {
    return parseCom.object('Country');
  }
})();
