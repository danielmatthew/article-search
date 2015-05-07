// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngSanitize'])

.service("articlesService", function($http, $q) {
  var deferred = $q.defer();
  $http.get('articles.json').then(function(data) {
    deferred.resolve(data);
  });

  this.getArticles = function() {
    return deferred.promise;
  }
})

.controller('MyCtrl', function($scope, $ionicPopup, Lunr, articlesService, $sce) {
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
    {id: 9, headline: "Don't be tempted by the politics of apathy. Vote for hope."},
    {id: 10, headline: "Clegg bums goats. More at 11."},
    {id: 11, headline: "Cameron bums Clegg in order to create coalition."}
  ];

  var promise = articlesService.getArticles();
  promise.then(function(data) {
    $scope.articles = data.data.data;
    console.log($scope.articles);
  });

  $scope.searchQuery;

  // Initialise Lunr index
  $scope.indexedText = lunr(function () {
    this.field('headline', {boost: 10}),
    this.ref('id')
  });


  // Loop over our data and add to index
  $scope.items.forEach(function(entry) {
    $scope.indexedText.add({
      id: entry.id,
      headline: entry.headline
    });
  });

  $scope.$watch('searchQuery', function(newVal) {
      console.log("String changed", newVal);
      // Update model with results from Lunr index
      $scope.searchIndex(newVal);
  });

  $scope.doSomething = function() {
    var items = $scope.items;
    if (!$scope.searchQuery) {
      $scope.showAlert();
    } else {
      $scope.items = $scope.searchIndex($scope.searchQuery);
      // $scope.items = $scope.searchResults; 
      console.log($scope.searchResults, $scope.indexedText.search($scope.searchQuery));
    }
  };

  $scope.searchIndex = function(q) {
    $scope.searchResults = $scope.indexedText.search(q)
      .map(function (result) {
        return $scope.items.filter(function (q) {
          return q.id === parseInt(result.ref, 10) // Adds id field to object 
        })[0];
      });

    console.log($scope.searchResults);
    return $scope.searchResults;
  };

  $scope.clearSearch = function() {
    $scope.searchQuery = "";
  };

  $scope.showAlert = function() {
    var alertPopup = $ionicPopup.alert({
      title: "Empty Query",
      template: "Please enter a search query"
    });
  };
  
  $scope.skipValidation = function(value) {
    return $sce.trustAsHtml(value);
  };
  
  $scope.toggleSection = function(sectionId) {
    console.log("You clicked: " + sectionId);
  };
})

.directive('dynamic', function($compile) {
  return {
    restrict: 'A',
    replace: true,
    link: function(scope, ele, attrs) {
      scope.$watch(attrs.dynamic, function(html) {
        ele.html(html);
        $compile(ele.contents())(scope);
      });
    }
  };
})

.factory('Lunr', function($window) {
  var lunr = $window.lunr;

  return lunr;
})

.filter('lunrFilter', function(){
  return function(items, letter) {
    var filteredSearchResults = [];

    var letterMatch = new RegExp(letter, 'i');

    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (letterMatch.test(item.headline)) {
        filteredSearchResults.push(item)
      }
    };



    return filteredSearchResults;
  }
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
