// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.controller('MyCtrl', function($scope, Lunr) {
  $scope.items = [
    {id: 0, headline: "Clegg hints at backing Tories"},
    {id: 1, headline: "Miliband pledge stone is 'Sheffield Rally' moment"},
    {id: 2, headline: "Thousands of migrants rescued in the Med"},
    {id: 3, headline: "Chelsea crowned champions after beating Crystal Palace"},
    {id: 4, headline: "101-year old man pulled alive from rubble"},
    {id: 5, headline: "Coalition plans to increase tutition fees to £11,500 a year, says Labour"},
    {id: 6, headline: "Islanders seek update after Facebook dumps them in Norway"},
    {id: 7, headline: "Top civil servant denies Labour overspend"},
    {id: 8, headline: "Britain set for weeks of political paralysis"},
    {id: 9, headline: "Don't be tempted by the politics of apathy. Vote for hope."}
  ];

  $scope.searchQuery;

  // Initialise Lunr index
  $scope.indexedText = lunr(function () {
    this.field('headline', {boost: 10})
    this.ref('id')
  });

  // Loop over our data and add to index
  $scope.items.forEach(function(entry) {
    $scope.indexedText.add({
      id: entry.id,
      headline: entry.headline
    });
  });

  $scope.doSomething = function() {
    // console.log('Clicked!');
    $scope.searchResults = $scope.indexedText.search($scope.searchQuery)
      .map(function (result) {
        return $scope.items.filter(function (q) {
          return q.id === parseInt(result.ref, 10)
        })[0];
      });

    $scope.items = $scope.searchResults;  
    console.log($scope.searchResults);

    // Filter items - should update automatically
    // $scope.items = $scope.items.filter(function(q) {
    //   return q.id === parseInt($scope.searchResults.ref, 10)[0];
    // })
  };
})

.factory('Lunr', function($window) {
  var lunr = $window.lunr;

  return lunr;
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
