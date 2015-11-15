describe('ToursController', function(){
  beforeEach(module('travelNg'));

  var toursController = null;
  var $scope = {};
  var $httpBackend;
  var url = 'https://api.parse.com/1/classes/';
  var countries = [{name: 'Country 1', objectId: "c1" }];
  var hotels = [{name: 'Hotel 1', objectId: "h1" }];

  var tours = [
    {
      title: 'Tour 1',
      place: {
        "__type":"Pointer",
        "className":"Place",
        "objectId":"p1"
      },
      country: {
        "__type":"Country",
        "className":"Country",
        "objectId":"c1"
      }
    },
    {
      title: 'Tour 2',
      place: {
        "__type":"Pointer",
        "className":"Place",
        "objectId":"p2"
      },
      country: {
        "__type":"Country",
        "className":"Country",
        "objectId":"c2"
      }
    }
  ];

  var places = [
    {
      name: 'Place 1',
      objectId: "p1",
      country: {
        "__type":"Country",
        "className":"Country",
        "objectId":"c1"
      }
    },
    {
      name: 'Place 2',
      objectId: "p2",
      country: {
        "__type":"Country",
        "className":"Country",
        "objectId":"c2"
      }
    }
  ];

  beforeEach(inject(function($controller, _$httpBackend_) {
    $httpBackend = _$httpBackend_;
    toursController = $controller('ToursController', {$scope: $scope});
    $httpBackend.whenGET(url + 'Tour').respond(200, {results: tours});
    $httpBackend.whenGET(url + 'Country').respond(200, {results: countries});
    $httpBackend.whenGET(url + 'Hotel').respond(200, {results: hotels});
    $httpBackend.whenGET(url + 'Place').respond(200, {results: places});
  }));

  describe('initialize', function() {
    describe('when variables belong to scope', function() {
      beforeEach(function() {
        $httpBackend.flush()
      });

      it('gets tours', function() {
        expect(angular.equals($scope.selectedTours, tours)).toBe(true);
      });

      it('gets countries', function() {
        expect(angular.equals($scope.countries, countries)).toBe(true);
      });
    });

    describe('when variables are local', function() {
      it('queries hotels', function() {
        $httpBackend.expectGET(url + 'Hotel');
        $httpBackend.flush();
        expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
      });
    });
  });

  describe('selectCountry', function() {
    beforeEach(function() {
      $httpBackend.flush()
    });

    describe('when country is selected', function() {
      beforeEach(function() {
        $scope.country = countries[0];
        $scope.selectCountry();
      });

      it('selects tours by country ', function() {
        expect(angular.equals($scope.selectedTours, [tours[0]])).toBe(true);
      });

      it('selects places by country', function() {
        expect(angular.equals($scope.placesByCountry, [places[0]])).toBe(true);
      });
    });

    describe('when country is not selected', function() {
      beforeEach(function() {
        $scope.country = null;
        $scope.selectCountry();
      });

      it('selects all tours', function() {
        expect(angular.equals($scope.selectedTours, tours)).toBe(true);
      });

      it('selects no places', function() {
        expect($scope.placesByCountry).toEqual({});
      });
    });
  });

  describe('selectPlace', function() {
    beforeEach(function() {
      $httpBackend.flush()
    });

    beforeEach(function() {
      $scope.country = countries[0];
    });

    describe('when place is selected', function() {
      beforeEach(function() {
        $scope.place = places[0];
        $scope.selectPlace();
      });

      it('selects tours by place', function() {
        expect(angular.equals($scope.selectedTours, [tours[0]])).toBe(true);
      });
    });

    describe('when place is not selected', function() {
      beforeEach(function() {
        $scope.place = null;
        $scope.selectPlace();
      });

      it('selects all tours by current country', function() {
        expect(angular.equals($scope.selectedTours, [tours[0]])).toBe(true);
      });
    });
  });
});
