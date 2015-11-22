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

    var capitalize = function(name) {
      return name.replace(/^./, name[0].toUpperCase());
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

    this.pointer = function(objectId, className) {
      if (objectId) {
        return {
          "__type":"Pointer",
          "className": capitalize(className),
          "objectId": objectId
        };
      } else {
        return {};
      }
    };

    this.objectByTour = function(tourObjectId) {
      return {
        where: {
          "tour":{
            "__type":"Pointer",
            "className":"Tour","objectId":tourObjectId
          }
        }
      };
    };
  }
})();
