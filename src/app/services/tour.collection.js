(function() {
  'use strict';

  angular
    .module('travelNg')
    .factory('ToursCollection', ToursCollection);

  function ToursCollection($http, baseUrl, $q, Tour) {
    var self = {
      all: function () {
        var tours = [];

        $http.get(baseUrl + 'Tour').then(function (response) {
          angular.forEach(response.data.results, function(value) {
            tours.push(new Tour(value));
          });
        });

        return tours;
      },

      get: function(id) {
        var tour =  {};
        tour.$deferred = $q.defer();

        $http.get(baseUrl + 'Tour/' + id).then(function (response) {
          tour = angular.extend(tour, new Tour(response.data));
          tour.$deferred.resolve();
        });

        return tour;
      },

      save: function(params) {
        var deferred =  $q.defer();

        $http.post(baseUrl + 'Tour', params).then(function (response) {
          params.objectId = response.data.objectId;
          var tour = new Tour(params);
          deferred.resolve(tour);
        });

        return deferred.promise;
      },

      update: function(params) {
        var deferred =  $q.defer();

        $http.put(baseUrl + 'Tour/' + params.objectId, params).then(function () {
          var tour = new Tour(params);
          deferred.resolve(tour);
        });

        return deferred.promise;
      },

      delete: function(id) {
        var deferred =  $q.defer();

        $http.delete(baseUrl + 'Tour/' + id).then(function () {
          deferred.resolve();
        });

        return deferred.promise;
      }
    };

    return self;
  }
})();
