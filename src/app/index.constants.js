/* global malarkey:false, toastr:false, moment:false */
(function() {
  'use strict';

  angular
    .module('travelNg')
    .constant('malarkey', malarkey)
    .constant('toastr', toastr)
    .constant('moment', moment)
    .constant('_', _)
    .constant('itemsOnPage', 5)
    .constant('baseUrl', 'https://api.parse.com/1/classes/');
})();
