(function() {
  'use strict';

  angular
    .module('travelNg')
    .service('parseCom', parseCom);

  function parseCom($resource) {
    var parse = function(data){
      data = angular.fromJson(data);
      return data.results;
    };

    this.object = function(obj) {
      var url = 'https://api.parse.com/1/classes/' + obj + '/:objectId';

      return $resource(
        url,
        { objectId: '@objectId' },
        {
          query: { isArray: true, transformResponse: parse },
          update: { method: 'PUT' }
        }
      );
    };
  }
})();
