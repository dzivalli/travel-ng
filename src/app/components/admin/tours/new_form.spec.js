describe('New tour form', function () {
  'use strict';

  var form;

  beforeEach(module('travelNg'));

  beforeEach(inject(function ($compile, $rootScope, $templateCache) {
    var $scope = $rootScope.$new();
    var templateHtml = $templateCache.get('app/components/admin/tours/tour_form.html');
    $compile(templateHtml)($scope);
    $scope.$digest();
    form = $scope.newTourForm;
  }));

  beforeEach(function () {
    form.name.$setViewValue('name');
    form.duration.$setViewValue(1);
    form.cost.$setViewValue(1);
    form.countryName.$setViewValue('country');
    form.placeName.$setViewValue('place');
    form.description.$setViewValue('description');
  });

  describe('when all fields are present', function () {
    it('is valid', function () {
      expect(form.$valid).toBeTruthy();
    });
  });

  describe('when required fields are missing', function () {
    it('is invalid if name is empty', function () {
      form.name.$setViewValue('');
      expect(form.$valid).toBeFalsy();
    });

    it('is invalid if duration is empty', function () {
      form.duration.$setViewValue('');
      expect(form.$valid).toBeFalsy();
    });

    it('is invalid if cost is empty', function () {
      form.cost.$setViewValue('');
      expect(form.$valid).toBeFalsy();
    });

    it('is invalid if countryName is empty', function () {
      form.countryName.$setViewValue('');
      expect(form.$valid).toBeFalsy();
    });

    it('is invalid if placeName is empty', function () {
      form.placeName.$setViewValue('');
      expect(form.$valid).toBeFalsy();
    });

    it('is invalid if description is empty', function () {
      form.description.$setViewValue('');
      expect(form.$valid).toBeFalsy();
    });
  });
});
