describe('filter directive', function () {
  'use strict';

  beforeEach(module('travelNg'));

  var $compile,
      $scope,
      filterDirective, search;

  function compileDirective() {
    var element = angular.element('<tour-filter countries="countries" places="places" filter-obj="filterObj"></tour-filter>');
    var compiledElement = $compile(element)($scope);
    $scope.$digest();

    return compiledElement;
  }

  beforeEach(inject(function(_$compile_, $rootScope, _search_) {
    $compile = _$compile_;
    $scope = $rootScope.$new();
    $scope.countries = ['country'];
    $scope.places = ['place'];
    $scope.filterObj= {country: {}, place: {}};
    search = _search_;
    spyOn(search, 'selectPlacesByCountry');

    filterDirective = compileDirective();
  }));

  describe('directive template', function () {
    it('creates directive with appropriate content', function() {
      expect(filterDirective.find('select').length).toEqual(2);
    });
  });

  describe('directive scope', function () {
    var isolatedScope = null;
    var expectValuesToBeEqual = function(variable) {
      $scope.$digest();
      expect(isolatedScope[variable]).toEqual($scope[variable]);
    };

    beforeEach(function () {
      isolatedScope = filterDirective.isolateScope();
    });

    describe('countries 2 way binding', function () {
      it('sets proper value', function () {
        expectValuesToBeEqual('countries');
      });

      it('changes values of both variables from directive', function () {
        isolatedScope.countries = ['country_2'];
        expectValuesToBeEqual('countries');
      });

      it('changes values of both variables from parent scope', function () {
        $scope.countries = ['country_2'];
        expectValuesToBeEqual('countries');
      });
    });

    describe('places 2 way binding', function () {
      it('sets proper value', function () {
        expectValuesToBeEqual('places');
      });

      it('changes values of both variables from directive', function () {
        isolatedScope.places = ['place_2'];
        expectValuesToBeEqual('places');
      });

      it('changes values of both variables from parent scope', function () {
        $scope.places = ['place_2'];
        expectValuesToBeEqual('places');
      });
    });

    describe('filterObj 2 way binding', function () {
      it('sets proper value', function () {
        expectValuesToBeEqual('filterObj');
      });

      it('changes values of both variables from directive', function () {
        isolatedScope.filterObj = {test: 1};
        expectValuesToBeEqual('filterObj');
      });

      it('changes values of both variables from parent scope', function () {
        $scope.filterObj = {test: 2};
        expectValuesToBeEqual('filterObj');
      });
    });

    describe('link functions', function () {
      describe('selectCountry', function () {
        it('calls placeByCountry search', function () {
          isolatedScope.country = 'country';
          isolatedScope.place = 'place';
          isolatedScope.selectCountry();

          expect(search.selectPlacesByCountry).toHaveBeenCalledWith(['place'], 'country');
        });

        describe('when one country is selected', function () {
          it('sets filterObj with id of selected country', function () {
            isolatedScope.country = {objectId: '123'};
            isolatedScope.selectCountry();

            expect($scope.filterObj).toEqual({country: {objectId: '123'}, place: {}});
          });
        });

        describe('when all countries are selected', function () {
          it('assigns empty objects to country and place', function () {
            isolatedScope.country = null;
            isolatedScope.selectCountry();

            expect($scope.filterObj).toEqual({country: {}, place: {}});
          });
        });
      });

      describe('selectPlace', function () {
        describe('when place is selected', function () {
          it('sets filterObj with ids of selected country and place', function () {
            isolatedScope.country = {objectId: 'countryId'};
            isolatedScope.place = {objectId: 'placeId'};
            isolatedScope.selectPlace();

            expect($scope.filterObj).toEqual({country: {objectId: 'countryId'}, place: {objectId: 'placeId'}});
          });
        });

        describe('when all places are selected', function () {
          it('sets filterObj with id of selected country', function () {
            isolatedScope.country = {objectId: 'countryId'};
            isolatedScope.place = null;
            isolatedScope.selectPlace();

            expect($scope.filterObj).toEqual({country: {objectId: 'countryId'}, place: {}});
          });
        });
      });
    });
  });
});

describe('tourFilterCtrl', function () {
  'use strict';

  beforeEach(module('travelNg'));

  var tourFilterCtrl = null;
  var $scope = null;

  beforeEach(inject(function($controller, $rootScope) {
    $scope = $rootScope.$new();
    $scope.selectCountry = jasmine.createSpy();
    $scope.selectPlace = jasmine.createSpy();

    tourFilterCtrl = $controller('tourFilterCtrl', {$scope: $scope});
  }));

  describe('filterBy', function() {
    describe('when object is country', function() {
      var country = {className: 'Country', name: 'Spain', objectId: 'id1'};

      beforeEach(function() {
        tourFilterCtrl.filterBy(country);
      });

      it('assigns empty object to place', function() {
        expect($scope.place).toEqual({});
      });

      it('calls selectCountry', function() {
        expect($scope.selectCountry).toHaveBeenCalledWith();
      });

      it('calls selectPlace', function() {
        expect($scope.selectPlace).toHaveBeenCalledWith();
      });

      it('sets country', function() {
        expect($scope.country).toEqual(country);
      });
    });

    describe('when object is place', function() {
      var place = {className: 'Place', name: 'Spain place', objectId: 'id2'};

      beforeEach(function() {
        tourFilterCtrl.filterBy(place);
      });

      it('calls selectPlace', function() {
        expect($scope.selectPlace).toHaveBeenCalledWith();
      });

      it('sets place', function() {
        expect($scope.place).toEqual(place);
      });
    });
  });
});
