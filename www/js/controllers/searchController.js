angular.module('searchController', [])
.controller('searchController', function($scope, $ionicPopup, $ionicLoading, Lunr, indexService, articlesService, headlineService, $sce, $filter, lunrFilterFilter) {
  
  // Populates .items with test data
  $scope.items = headlineService.getArticles();
  
  // Displays loading screen
  $ionicLoading.show();
  
  // Retrieves data from JSON file and populates .articles when promise
  // is fulfilled
  var promise = articlesService.getArticles();
  promise.then(function(data) {
    $scope.articles = data.data.data;
    $ionicLoading.hide();
//    console.log($scope.articles);
  });
  
  
 
  $scope.searchQuery;

  // Initialise Lunr index
  $scope.indexedText = Lunr(function () {
    this.field('headline', {boost: 10});
    this.ref('id');
  });


  // Loop over our data and add to index
  $scope.items.forEach(function(entry) {
    $scope.indexedText.add({
      id: entry.id,
      headline: entry.headline
    });
  });
  
  	
  // Watch input and debounce search
  $scope.$watch('searchQuery', function(newVal) {
//      if (newVal) {
//        $scope.searchIndex(newVal);
        console.log("String changed", newVal);
//      }

      // Update model with results from Lunr index
      $scope.searchIndex(newVal);
  });

  // Original function to get search terms from list
  $scope.doSomething = function() {
//    var items = $scope.articles;
//    if (!$scope.searchQuery) {
//      $scope.showAlert();
//    } else {
//      return items = items.slice($scope.searchIndex($scope.searchQuery));
//      // $scope.items = $scope.searchResults; 
//      console.log($scope.searchResults, $scope.indexedText.search($scope.searchQuery));
//    }
    
    return $scope.articles = $filter('filter')($scope.articles, {'title':'Cultural'});
//    return $scope.articles
    
  };
  
 $scope.results = {};

  // Takes query and returns items that are in index
  $scope.searchIndex = function(q) {
    $scope.searchResults = $scope.indexedText.search(q)
      .map(function (result) {
        return $scope.items.filter(function (q) {
          return q.id === parseInt(result.ref, 10); // Adds id field to object 
        })[0];
      });
            
      if ($scope.searchResults.length == 0) {
        $scope.results = $scope.items;
      } else {
        $scope.results = $scope.searchResults;
      } 
   

    console.log($scope.searchResults);  
  };
  
// Function never seemed to work in first place!
//  $scope.clearSearch = function() {
//    $scope.searchQuery = "";
//  };

  $scope.showAlert = function() {
    var alertPopup = $ionicPopup.alert({
      title: "Empty Query",
      template: "Please enter a search query"
    });
  };
  
  $scope.skipValidation = function(value) {
    return $sce.trustAsHtml(value);
  };
  
  $scope.isSectionShown = function(section) {
    return $scope.shownSection === section;
  };
  
  $scope.toggleSection = function(section) {
    if ($scope.isSectionShown(section)) {
      $scope.shownSection = null;
    } else {
      $scope.shownSection = section;
    }
  };
})