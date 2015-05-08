angular.module('loadingDirective', [])
.directive('loading', function($http) {
  return {
    restrict: 'A',
    link: function(scope, ele, attrs) {
      scope.isLoading = function() {
        return $http.pendingRequests.length > 0;
      };
      
      scope.$watch(scope.isLoading, function(v) {
        if (v) {
          ele.show();
        } else {
          ele.hide();
        }
      });
    }
  };
})