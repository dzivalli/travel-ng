(function(){
  'use strict';

  angular
    .module('travelNg')
    .factory('Place', placeFactory);

  function placeFactory($resource, parseResult) {
    return $resource(
      'https://api.parse.com/1/classes/Place/:objectId',
      { objectId: '@objectId' },
      {
        query: { isArray: true, transformResponse: parseResult.parse },
        update: { method: 'PUT' }
      }
    );
  }

})();
