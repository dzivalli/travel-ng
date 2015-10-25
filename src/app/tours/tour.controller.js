(function() {
  'use strict';

  angular
    .module('travelNg')
    .controller('TourController', TourController);

  function TourController($scope, $resource, $routeParams) {
    var Tour = $resource(
      'https://api.parse.com/1/classes/Tour/:objectId',
      { objectId: '@objectId' }
    );

    var Country = $resource(
      'https://api.parse.com/1/classes/Country/:objectId',
      { objectId: '@objectId' }
    );

    $scope.tour = Tour.get({objectId: $routeParams.slug}, function(data) {
      $scope.country = Country.get({objectId: data.country.objectId});
    });
  }
})();
