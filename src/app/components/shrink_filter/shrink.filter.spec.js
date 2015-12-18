describe('shrink filter', function () {
  'use strict';

  beforeEach(module('travelNg'));

  var shrinkFilter;
  var text = 'word1 word2 word3';

  beforeEach(inject(function (_shrinkFilter_) {
    shrinkFilter = _shrinkFilter_;
  }));

  describe('when overall amount of words more than amount to show', function () {
    it('returns first 2 words', function () {
      expect(shrinkFilter(text, 2)).toEqual('word1 word2...');
    });
  });

  describe('when overall amount of words less than amount to show', function () {
    it('returns whole text', function () {
      expect(shrinkFilter(text, 4)).toEqual('word1 word2 word3');
    });
  });
});
