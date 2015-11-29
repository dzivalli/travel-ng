(function() {
  'use strict';

  angular
    .module('travelNg')
    .service('search', search);

  function search(_) {
    this.selectPlacesByCountry = function(places, country) {
      if (country && country.objectId) {
        return _.where(places, {country: {objectId: country.objectId}});
      } else {
        return {};
      }
    };

    this.selectToursByCountryAndPlace = function(tours, country, place) {
      if (place && place.objectId) {
        return _.where(
          tours,
          {
            country: { objectId: country.objectId },
            place: { objectId: place.objectId }
          }
        );
      } else if (country && country.objectId) {
        return _.where(tours, {country: {objectId: country.objectId}});
      } else {
        return tours;
      }
    };
  }
})();
