angular.module('lunrService', [])
.factory('Lunr', function($window) {
  var lunr = $window.lunr;

  return lunr;
})