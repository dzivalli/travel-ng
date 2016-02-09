describe('AdminToursController', function() {
  'use strict';

  beforeEach(module('travelNg'));

  var AdminToursController = null;
  var $httpBackend = null;
  var $scope = {};
  var url = 'https://api.parse.com/1/classes/';
  var countries = [{name: 'Country 1', objectId: "c1"}];
  var places = [{name: 'Place 1', objectId: "p1"}];
  var tours = [{title: 'tour 1', objectId: "t1"}];


  beforeEach(inject(function($controller, _$httpBackend_) {
    AdminToursController = $controller('AdminToursController', {$scope: $scope});
    $httpBackend = _$httpBackend_;
    $httpBackend.whenGET(url + 'Tour').respond(200, {results: tours});
    $httpBackend.whenGET(url + 'Country').respond(200, {results: countries});
    $httpBackend.whenGET(url + 'Place').respond(200, {results: places});
  }));

  describe('initialize', function() {
    describe('when store variables in controller scope', function() {
      beforeEach(function() {
        $httpBackend.flush();
      });

      it('sets showNewForm to false', function() {
        expect($scope.showNewForm).toBe(false);
      });

      it('gets all tours', function() {
        expect(angular.equals($scope.tours, tours)).toBe(true);
      });

      it('gets all countries', function() {
        expect(angular.equals($scope.countries, countries)).toBe(true);
      });

    });

    describe('when init local variables', function() {
      it('gets all places', function() {
        $httpBackend.expectGET(url + 'Place');
        $httpBackend.flush();
        expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
      });
    });
  });

  describe('addTour', function() {
    var newTour = {
      title: 'new tour',
      description: 'new desc',
      country: countries[0],
      place: places[0]
    };

    beforeEach(function() {
      $httpBackend.flush();
      $httpBackend.whenPOST(url + 'Tour').respond(201, newTour);
    });

    it('sends post request', function() {
      $httpBackend.expectPOST(url + 'Tour');
      $scope.addTour(newTour);
      $httpBackend.flush();
      expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });

    it('adds new tour to tours', function() {
      $scope.addTour(newTour);
      $httpBackend.flush();
      expect($scope.tours.length).toEqual(2);
    });
  });

  describe('deleteTour', function() {
    beforeEach(function() {
      $httpBackend.flush();
      $httpBackend.whenDELETE(url + 'Tour/' + tours[0].objectId).respond(204);
    });

    it('sends delete request', function() {
      $httpBackend.expectDELETE(url + 'Tour/' + tours[0].objectId);
      $scope.deleteTour(0);
      $httpBackend.flush();
      expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });

    it('deletes tour from tours', function() {
      $scope.deleteTour(0);
      $httpBackend.flush();
      expect($scope.tours.length).toEqual(0);
    });
  });

  describe('editTour', function() {
    beforeEach(function() {
      $httpBackend.flush();
      $scope.editTour(0);
    });

    it('sets edit flag to true', function() {
      expect($scope.tours[0].edit).toEqual(true);
    });

    it('copies edited tour to editedTour', function() {
      expect($scope.editedTour).toEqual($scope.tours[0]);
    });
  });

  describe('saveTour', function() {
    beforeEach(function() {
      $httpBackend.flush();
      $httpBackend.whenPUT(url + 'Tour/' + tours[0].objectId).respond(200);
      $scope.editedTour = {
        title: 'edited tour',
        objectId: 't1',
        place: places[0],
        country: countries[0]
      };
      $httpBackend.expectPUT(url + 'Tour/' + tours[0].objectId);
      $scope.saveTour(0);
      $httpBackend.flush();
    });

    it('sends put request', function() {
      expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });

    it('updates tour', function() {
      expect($scope.tours[0].title).toEqual($scope.editedTour.title);
    });

    it('sets flag edit to default', function() {
      expect($scope.tours[0].edit).toEqual(false);
    });
  });

  describe('cancelTour', function() {
    beforeEach(function() {
      $httpBackend.flush();
      $scope.cancelTour();
    });

    it('sets variables to default', function() {
      expect($scope.showNewForm).toEqual(false);
    });
  });
});
