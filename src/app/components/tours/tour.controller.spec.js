describe('TourController', function() {
  'use strict';

  beforeEach(module('travelNg'));

  var tourController = null;
  var $scope = {};
  var tour = {
    title: 'Tour 1',
    objectId: 't1',
    place: {
      "__type": "Pointer",
      "className": "Place",
      "objectId": "p1"
    },
    country: {
      "__type": "Pointer",
      "className": "Country",
      "objectId": "c1"
    }
  };

  var place = {name: 'Place 1', objectId: 'p1'};
  var country = {name: 'Country 1', objectId: 'c1'};
  var hotels_result = {results: [{title: 'Hotel 1', objectId: 'h1'}]};


  beforeEach(inject(function($controller, $q, $rootScope) {
    $scope = $rootScope.$new();

    var TourMock = {
      get: function() {
        var tourDefer = $q.defer();
        tourDefer.resolve(tour);

        return tourDefer.promise;
      }
    };

    var PlaceMock = {
      get: function() {
        return place;
      }
    };

    var CountryMock = {
      get: function() {
        return country;
      }
    };

    var HotelMock = {
      get: function(params, callback) {
        callback(hotels_result);
      }
    };

    tourController = $controller('TourController',
      {
        $scope: $scope,
        ToursCollection: TourMock,
        Place: PlaceMock,
        Country: CountryMock,
        Hotel: HotelMock
      }
    );
  }));

  describe('initialize', function() {
    beforeEach(function() {
      $scope.$apply();
    });

    it('gets tour', function() {
      expect($scope.tour).toEqual(tour);
    });

    it('gets country', function () {
      expect($scope.country).toEqual(country);
    });

    it('gets place', function () {
      expect($scope.place).toEqual(place);
    });

    it('gets hotel', function () {
      expect($scope.hotel).toEqual(hotels_result.results[0]);
    });
  });
});
