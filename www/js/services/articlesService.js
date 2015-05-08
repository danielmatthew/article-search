angular.module('articlesService', [])
.service("articlesService", function($http, $q) {
  var articles = [];
  var deferred = $q.defer();
  $http.get('articles.json').then(function(data) {
    deferred.resolve(data);
    articles = data;
  });

  this.getArticles = function() {
    return deferred.promise;
  }
})