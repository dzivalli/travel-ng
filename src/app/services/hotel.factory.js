(function() {
  'use strict';

  angular
    .module('travelNg')
    .factory('Hotel', hotelFactory);

  function hotelFactory(parseCom) {
    return parseCom.object('Hotel');
  }
})();
