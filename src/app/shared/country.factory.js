(function() {
  'use strict';

  angular
    .module('travelNg')
    .factory('Country', countryFactory);

  function countryFactory($resource, parseResult) {
    return $resource(
      'https://api.parse.com/1/classes/Country/:objectId',
      { objectId: '@objectId' },
      {
        query: { isArray: true, transformResponse: parseResult.parse },
        update: { method: 'PUT' }
      }
    );
  }
})();
