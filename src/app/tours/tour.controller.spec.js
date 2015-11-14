describe('TourController', function() {
  beforeEach(module('travelNg'));

  var tourController = null;
  var $httpBackend = null;
  var $scope = {};
  var url = 'https://api.parse.com/1/classes/';
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
  var hotel_raw = {results: [{title: 'Hotel 1', objectId: 'h1'}]};

  beforeEach(inject(function($controller, _$httpBackend_, $httpParamSerializer, parseCom) {
    $httpBackend = _$httpBackend_;
    tourController = $controller('TourController', {$scope: $scope, $routeParams: {slug: tour.objectId}});
    $httpBackend.whenGET(url + 'Tour/' + tour.objectId).respond(200, tour);
    $httpBackend.whenGET(url + 'Country/' + tour.country.objectId).respond(200, country);
    $httpBackend.whenGET(url + 'Place/' + tour.place.objectId).respond(200, place);
    $httpBackend.whenGET(url + 'Hotel?' + $httpParamSerializer(parseCom.objectByTour(tour.objectId))).respond(200, hotel_raw);
    $httpBackend.flush();
  }));

  describe('initialize', function() {
    it('gets tour', function() {
      expect(angular.equals($scope.tour, tour)).toBe(true);
    });

    it('gets country', function () {
      expect(angular.equals($scope.country, country)).toBe(true);
    });

    it('gets place', function () {
      expect(angular.equals($scope.place, place)).toBe(true);
    });

    it('gets hotel', function () {
      expect(angular.equals($scope.hotel, hotel_raw.results[0])).toBe(true);
    });
  });
});
