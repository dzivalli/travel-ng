(function(){
  'use strict';

  angular
    .module('travelNg')
    .factory('Place', placeFactory);

  function placeFactory(parseCom) {
    return parseCom.object('Place');
  }

})();
