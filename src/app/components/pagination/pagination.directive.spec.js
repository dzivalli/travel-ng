describe('Pagination', function () {
  'use strict';

  beforeEach(module('travelNg', function ($provide) {
    $provide.constant('itemsOnPage', 2);
  }));

  var $compile, $scope, paginationDirective, itemsOnPage, isolatedScope;

  function compileDirective() {
    var element = angular.element('<dz-pagination items-count="{{selectedTours.length}}" display-range="displayRange(first, last)"></dz-pagination>');
    var compiledElement = $compile(element)($scope);
    $scope.$digest();

    return compiledElement;
  }

  beforeEach(inject(function(_$compile_, $rootScope, _itemsOnPage_) {
    $compile = _$compile_;
    $scope = $rootScope.$new();
    $scope.selectedTours = ['tour'];
    $scope.displayRange = jasmine.createSpy('displayRange');
    itemsOnPage = _itemsOnPage_;

    paginationDirective = compileDirective();
    isolatedScope = paginationDirective.isolateScope();
  }));

  describe('directive template', function() {
    it('creates directive with appropriate content', function() {
      expect(paginationDirective.find('a').length).toBe(1);
    });
  });

  describe('scope', function () {
    describe('itemsCount 1 way binding', function() {
      var expectValuesToBeEqual = function() {
        $scope.$digest();
        expect(isolatedScope.itemsCount).toEqual($scope.selectedTours.length.toString());
      };

      it('sets proper value', function() {
        expectValuesToBeEqual();
      });

      it('changes values of both variables from parent scope', function() {
        $scope.selectedTours.push('tour 2');
        expectValuesToBeEqual();
      });

      it('does not change value variable from isolated scope', function() {
        isolatedScope.itemsCount = 5;
        $scope.$digest();

        expect(isolatedScope.itemsCount).not.toEqual($scope.selectedTours.length.toString());
      });
    });
  });

  describe('link functions', function () {
    describe('page', function() {
      var pageNumber = 1;

      beforeEach(function () {
        isolatedScope.page(pageNumber);
        $scope.$digest();
      });

      it('assigns current page number to activePage', function() {
        expect(isolatedScope.activePage).toEqual(pageNumber);
      });
    });

    describe('$watch on itemsCount', function() {
      beforeEach(function () {
        spyOn(isolatedScope, 'page');
        $scope.selectedTours.push.apply($scope.selectedTours, ['tour 2', 'tour 3', 'tour 4']);
        $scope.$digest();
      });

      it('assigns itemsRange', function () {
        expect(isolatedScope.itemsRange.length).toEqual(2);
      });

      it('calls page function', function () {
        expect(isolatedScope.page).toHaveBeenCalledWith(0);
      });
    });
  });
});
