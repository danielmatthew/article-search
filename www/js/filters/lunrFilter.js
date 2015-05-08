angular.module('lunrFilter',[])
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