(function(){
  'use strict';

  angular
    .module('travelNg')
    .factory('Tour', tourFactory);

  function tourFactory($resource, parseResult) {
    return $resource(
      'https://api.parse.com/1/classes/Tour/:objectId',
      { objectId: '@objectId' },
      {
        query: { isArray: true, transformResponse: parseResult.parse },
        update: { method: 'PUT' }
      }
    );
  }
})();
