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
        if (self.image) {
          return self.image.url;
        } else {
          return 'assets/images/default.png';
        }
      }
    };

    return tour;
  }
})();
