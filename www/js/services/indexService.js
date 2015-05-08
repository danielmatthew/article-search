angular.module('indexService', [])
.service("indexService", function(Lunr) {
  var index = Lunr(function() {
    this.field('title', {boost: 10});
    this.ref('content_id');
  });
  
  return index;
})