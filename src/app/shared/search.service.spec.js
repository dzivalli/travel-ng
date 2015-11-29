describe('search service', function() {
  'use strict';

  beforeEach(module('travelNg'));

  var search = null;
  var country = {name: 'Country 1', objectId: "c1" };
  var tours = [
    {
      title: 'Tour 1',
      place: {
        "__type":"Pointer",
        "className":"Place",
        "objectId":"p1"
      },
      country: {
        "__type":"Country",
        "className":"Country",
        "objectId":"c1"
      }
    },
    {
      title: 'Tour 2',
      place: {
        "__type":"Pointer",
        "className":"Place",
        "objectId":"p2"
      },
      country: {
        "__type":"Country",
        "className":"Country",
        "objectId":"c2"
      }
    }
  ];

  var places = [
    {
      name: 'Place 1',
      objectId: "p1",
      country: {
        "__type":"Country",
        "className":"Country",
        "objectId":"c1"
      }
    },
    {
      name: 'Place 2',
      objectId: "p2",
      country: {
        "__type":"Country",
        "className":"Country",
        "objectId":"c2"
      }
    }
  ];

  beforeEach(inject(function(_search_) {
    search = _search_;
  }));

  describe('selectPlacesByCountry', function() {
    it('returns empty object if country is empty object', function() {
      expect(search.selectPlacesByCountry(places, {})).toEqual({});
    });

    it('returns empty object if country is null', function() {
      expect(search.selectPlacesByCountry(places, null)).toEqual({});
    });

    it('returns places by given country', function() {
      expect(search.selectPlacesByCountry(places, country)).toEqual([places[0]]);
    });
  });

  describe('selectToursByCountry', function() {
    it('returns all tours if country is empty object', function() {
      expect(search.selectToursByCountry(tours, {})).toEqual(tours);
    });

    it('returns all tours if country is null', function() {
      expect(search.selectToursByCountry(tours, null)).toEqual(tours);
    });

    it('returns tours by given country', function() {
      expect(search.selectToursByCountry(tours, country)).toEqual([tours[0]]);
    });
  });

  describe('selectToursByCountryAndPlace', function() {
    it('returns tours by country if place is empty object', function() {
      expect(search.selectToursByCountryAndPlace(tours, country, {})).toEqual([tours[0]]);
    });

    it('returns tours by country if place is null', function() {
      expect(search.selectToursByCountryAndPlace(tours, country, null)).toEqual([tours[0]]);
    });

    it('returns tours by country and place', function() {
      expect(search.selectToursByCountryAndPlace(tours, country, places[0])).toEqual([tours[0]]);
    });
  });
});
