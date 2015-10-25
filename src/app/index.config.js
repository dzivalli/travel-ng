(function() {
  'use strict';

  angular
    .module('travelNg')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastr, $httpProvider, $locationProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastr.options.timeOut = 3000;
    toastr.options.positionClass = 'toast-top-right';
    toastr.options.preventDuplicates = true;
    toastr.options.progressBar = true;

    $httpProvider.defaults.headers.common = {
      'X-Parse-Application-Id': 'P3yrQQP1Ski2sA6eMuEcXLTugsntCXkDdhseyk13',
      'X-Parse-REST-API-Key': 'MHnGP58WItHoXAJOpyiAh71gZQfJPEnabHcnbps5'
    },

    $locationProvider.html5Mode(true);
  }

})();
