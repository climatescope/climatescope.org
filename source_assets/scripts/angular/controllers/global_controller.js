(function(){
  var app = angular.module('globalApp', ['ui.bootstrap', 'mathFilters'], function($interpolateProvider) {
    $interpolateProvider.startSymbol('%%');
    $interpolateProvider.endSymbol('%%');
  });

  app.controller('CountryListController', ['$http', function($http) {
    var _self = this;
    // Data.
    this.countries = [];
    this.rankingField = 'overall_ranking';
    
    setupCommonCountryListMethods(_self);
    // Set sort.
    this.sortExpScoreField = '-score';
    this.setSortExpression('score');

    var url = CS.domain + '/' + CS.lang + '/api/countries.json';
    $http.get(url).success(function(data) {
      _self.countries = data;
    });
    
  }]);
})();