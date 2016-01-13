(function() {
  'use strict';

  angular
    .module('travelNg')
    .filter('shrink', shrink);

  function shrink() {
    return function (text, amountOfWords) {
      var arrOfWords = text.split(' ');

      if (arrOfWords.length > amountOfWords) {
        return arrOfWords.slice(0, amountOfWords).join(' ') + '...';
      } else {
        return text;
      }
    };
  }
})();
