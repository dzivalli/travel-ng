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
