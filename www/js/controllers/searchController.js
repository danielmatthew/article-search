angular.module('searchController', [])
.controller('searchController', function($scope, $ionicPopup, $ionicLoading, Lunr, articlesService, $sce, $debounce) {
      
  // Displays loading screen
  $ionicLoading.show();
  
  // Get data from JSON file and populate .articles when promise
  // is fulfilled
  var promise = articlesService.getArticles();
  promise.then(function(data) {
    $scope.articles = data.data.data;
    $ionicLoading.hide();
    console.log($scope.articles);
  })
  .then(function(data) {
    // Initialise Lunr index
    $scope.indexedText = Lunr(function () {
      this.field('title', {boost: 10});
      this.ref('id');
    });
  })
  .then(function(data) {
    // Index data
    $scope.articles.forEach(function(entry) {
      $scope.indexedText.add({
        id: entry.id,
        title: entry.title
      });
    });
  })
  .then(function() {
    // Start watching for input
    $scope.$watch('searchQuery', function(newVal) {
        if (newVal) {
          $debounce($scope.searchIndex(newVal), 2000);
        }
    });    
  });
  


  
  // Takes query and returns items that are in index
  $scope.searchIndex = function(q) {
    var articles = $scope.articles;
    var searchResults;
    
    searchResults = $scope.indexedText.search(q)
      .map(function (result) {
        return articles.filter(function (q) {
          return q.id === parseInt(result.ref, 10); // Adds id field to object 
        })[0];
      });
                 
      if (searchResults.length === 0 || searchResults === undefined) {
        $scope.results = "";
      } else {
        $scope.results = searchResults;
      }
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
  
   $scope.skipValidation = function(value) {
    return $sce.trustAsHtml(value);
  };
})