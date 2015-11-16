describe('parseCom', function() {
  beforeEach(module('travelNg'));

  var parseCom = null;
  var object = 'Hotel';
  var $httpBackend = null;
  var url = 'https://api.parse.com/1/classes/';

  beforeEach(inject(function(_parseCom_, _$httpBackend_) {
    parseCom = _parseCom_;
    $httpBackend = _$httpBackend_;
  }));

  describe('parseCom.object', function() {
    describe('QUERY', function() {
      beforeEach(function() {
        $httpBackend.whenGET(url + object).respond(200, {results: []});
      });

      it('gets objects ', function() {
        $httpBackend.expectGET(url + object);
        parseCom.object(object).query();
        $httpBackend.flush();
        expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
      });

      it('returns array', function() {
        var result = parseCom.object(object).query();
        $httpBackend.flush();
        expect(angular.equals(result, [])).toBe(true);
      })
    });

    describe('GET', function() {
      beforeEach(function() {
        $httpBackend.whenGET(url + object + '/objectId').respond(200, {});
      });

      it('get object by ObjectId', function() {
        $httpBackend.expectGET(url + object + '/objectId');
        parseCom.object(object).get({objectId: 'objectId'});
        $httpBackend.flush();
        expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
      });

      it('returns single object', function() {
        var result = parseCom.object(object).get({objectId: 'objectId'});
        $httpBackend.flush();
        expect(angular.equals(result, {})).toBe(true);
      });
    });

    describe('SAVE', function() {
      describe('when new object', function() {
        beforeEach(function() {
          $httpBackend.whenPOST(url + object).respond(200)
        });

        it('send post', function() {
          $httpBackend.expectPOST(url + object);
          parseCom.object(object).save({title: 'title'});
          $httpBackend.flush();
          expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
        })
      });

      describe('when updates existed object', function() {
        beforeEach(function() {
          $httpBackend.whenPOST(url + object + '/objectId').respond(200)
        });

        it('send post', function() {
          $httpBackend.expectPOST(url + object + '/objectId');
          parseCom.object(object).save({title: 'title', objectId: 'objectId'});
          $httpBackend.flush();
          expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
        })
      });
    });

    describe('DELETE', function() {
      beforeEach(function() {
        $httpBackend.whenDELETE(url + object + '/objectId').respond(200);
      });

      it('send delete request', function() {
        $httpBackend.expectDELETE(url + object + '/objectId');
        parseCom.object(object).delete({objectId: 'objectId'});
        $httpBackend.flush();
        expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
      });
    });
  });

});
