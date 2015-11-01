(function() {
  'use strict';

  angular
    .module('travelNg')
    .service('parseResult', parseResult);

  function parseResult() {
    this.parse = function(data){
      data = angular.fromJson(data);
      return data.results;
    };
  }
})();
