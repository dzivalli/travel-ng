(function() {
  'use strict';

  angular
    .module('travelNg')
    .filter('stars', stars);

  function stars() {
    return function(amount) {
      if (amount && parseInt(amount)) {
        var html = '';

        for (var i = 0; i < parseInt(amount); i++) {
          html += '<span class="glyphicon glyphicon-star"></span>';
        }

        return html;
      }
    };
  }
})();
