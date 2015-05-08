angular.module('hService', [])
.service('headlineService', function() {
  var articles = [
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
  
  return {
    getArticles: function() {
      return articles;
    }
  };
})