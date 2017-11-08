(function(){
  var app = angular.module('globalApp', ['ui.bootstrap', 'mathFilters', 'csDirectives'], function($interpolateProvider) {
    $interpolateProvider.startSymbol('%%');
    $interpolateProvider.endSymbol('%%');
  });

  app.controller('CountryListController', ['$http', function($http) {
    var _self = this;
    // Data.
    this.countries = [];
    
    setupCommonCountryListMethods(_self);
    // Set sort.
    this.sortExpScoreField = '-score[0].value';
    this.setSortExpression('score[0].value');

    var url = CS.domain + '/' + CS.lang + '/api/countries.json';
    $http.get(url).success(function(data) {
      _self.countries = data;
    });
  }]);

  app.controller('ToolsListController', function() {
    this.tools = arrayShuffle(CS.toolsData).slice(0, 3);
  });
})();

function arrayShuffle (array) {
  // Poor man clone.
  array = JSON.parse(JSON.stringify(array));
  var ln = array.length;
  var shuffled = [];

  while (ln > 0) {
    var j = Math.floor(Math.random() * (ln));
    shuffled.push(array.splice(j, 1)[0]);
    ln--;
  }

  return shuffled;
}