(function() {
  'use strict';

  angular
    .module('travelNg')
    .controller('HotelsController', HotelsController);

  function HotelsController($scope, Hotel, Tour, parseCom) {
    $scope.tours = Tour.query();
    $scope.hotels = Hotel.query();

    $scope.addHotel = function() {
      var hotel = angular.copy($scope.newHotel);
      hotel.tour = parseCom.pointer($scope.newHotel.tour.objectId, 'tour');
      delete hotel.edit;

      Hotel.save(hotel, function() {
        $scope.hotels.push(hotel);
        $scope.newHotel = {};
      });
    };

    $scope.getTour = function(objectId) {
      return _.find($scope.tours, { objectId: objectId });
    };

    $scope.deleteHotel = function(index) {
      Hotel.delete($scope.hotels[index], function() {
        $scope.hotels.splice(index, 1);
      });
    };

    $scope.editHotel = function(index) {
      $scope.hotels[index].edit = true;
      $scope.editedHotel = $scope.hotels[index];
    };

    $scope.saveHotel = function(index) {
      var hotel = angular.copy($scope.editedHotel);
      hotel.tour = parseCom.pointer(hotel.tour.objectId, 'tour');
      delete hotel.edit;

      Hotel.update(hotel, function() {
        $scope.hotels[index] = hotel;
        $scope.editedHotel = {}
      })
    }
  }

})();
