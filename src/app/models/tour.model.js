(function() {
  'use strict';

  angular
    .module('travelNg')
    .factory('Tour', Tour);

  function Tour() {
    var tour = function(params) {
      var self = this;

      angular.extend(self, params);

      self.imageUrl = function() {
        return !!self.image ? self.image.url :  'assets/images/default.png';
      }
    };

    return tour;
  }
})();
