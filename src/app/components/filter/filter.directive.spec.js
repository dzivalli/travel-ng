describe('filter', function () {
  'use strict';

  beforeEach(module('travelNg'));

  var $compile,
      $scope,
      filterDirective, search;


  function compileDirective() {
    var element = angular.element('<tour-filter countries="countries" places="places" filter="filter(country, place)"></tour-filter>');
    var compiledElement = $compile(element)($scope);
    $scope.$digest();

    return compiledElement;
  }

  beforeEach(inject(function(_$compile_, $rootScope, _search_) {
    $compile = _$compile_;
    $scope = $rootScope.$new();
    $scope.countries = ['country'];
    $scope.places = ['place'];
    $scope.filter = jasmine.createSpy('filter');
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

    describe('filter function', function () {
      it('is defined', function () {
        expect(typeof(isolatedScope.filter)).toBe('function');
      });

      it('calls function from parent scope', function () {
        isolatedScope.filter({country: 'country', place: 'place'});
        expect($scope.filter).toHaveBeenCalledWith('country', 'place');
      });
    });

    describe('link functions', function () {
      beforeEach(function () {
        isolatedScope.country = 'country';
        isolatedScope.place = 'place';
      });

      describe('selectCountry', function () {
        beforeEach(function () {
          isolatedScope.selectCountry();
        });

        it('calls filter function', function () {
          expect($scope.filter).toHaveBeenCalledWith('country', {});
        });

        it('calls placeByCountry search', function () {
          expect(search.selectPlacesByCountry).toHaveBeenCalledWith(['place'], 'country');
        });
      });

      describe('selectPlace', function () {
        it('calls filter function', function () {
          isolatedScope.selectPlace();
          expect($scope.filter).toHaveBeenCalledWith('country', 'place');
        });
      });
    });
  });
});
