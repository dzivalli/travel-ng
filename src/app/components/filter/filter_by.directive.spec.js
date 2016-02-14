describe('filter_by directive', function () {
  'use strict';

  beforeEach(module('travelNg'));

  var $compile, $scope;

  beforeEach(inject(function($rootScope, _$compile_) {
    $compile = _$compile_;
    $scope = $rootScope.$new();
  }));

  function compileDirective(html) {
    var template = angular.element(html);
    var directive = $compile(template)($scope);

    $scope.$digest();
    return directive;
  }


  describe('when required outer directive is not found', function () {
    it('throws an error', function () {
      expect(function() {
        compileDirective('<a tour-filter-by></a>');
      }).toThrowError();
    });
  });

  describe('when required outer directive is found', function() {
    it('does not throw an error', function() {
      expect(function() {
        compileDirective('<tour-filter><a tour-filter-by></a></tour-filter>');
      }).not.toThrowError();
    });

    it('calls function from outer directive', function() {
      var element = compileDirective('<tour-filter><a tour-filter-by></a></tour-filter>');
      var tourFilterCtrl = element.controller('tourFilter');

      spyOn(tourFilterCtrl, 'filterBy');
      element.find('a').triggerHandler('click');

      expect(tourFilterCtrl.filterBy).toHaveBeenCalled();
    });
  });
});
