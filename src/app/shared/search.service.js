(function() {
  'use strict';

  angular
    .module('travelNg')
    .service('search', search);

  function search(_) {
    this.selectPlacesByCountry = function(places, country) {
      if (country.objectId) {
        return _.where(places, {country: {objectId: country.objectId}});
      } else {
        return {};
      }
    };

    this.selectToursByCountry = function(tours, country) {
      if (country.objectId) {
        return _.where(tours, {country: {objectId: country.objectId}});
      } else {
        return tours;
      }
    };

    this.selectToursByCountryAndPlace = function(tours, country, place) {
      if (place.objectId) {
        return _.where(
          tours,
          {
            country: { objectId: country.objectId },
            place: { objectId: place.objectId }
          }
        );
      } else {
        return _.where(tours, {country: {objectId: country.objectId}});
      }
    };
  }
})();
