describe('stars filter', function () {
  'use strict';

  beforeEach(module('travelNg'));

  var starsFilter;

  beforeEach(inject(function(_starsFilter_) {
    starsFilter = _starsFilter_;
  }));

  describe('when passed value is wrong', function () {
    it('is not defined if value cannot be parsed', function() {
      expect(starsFilter('qw')).not.toBeDefined();
    });

    it('is not defined if there is no value', function() {
      expect(starsFilter()).not.toBeDefined();
    });
  });

  it('returns html with amount of stars eq to passed value', function () {
    expect(starsFilter(3).match(/glyphicon-star/g).length).toEqual(3);
  });
});
