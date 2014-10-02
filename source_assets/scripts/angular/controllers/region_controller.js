(function(){
  var app = angular.module('regionApp', ['ui.bootstrap', 'mathFilters'], function($interpolateProvider) {
    $interpolateProvider.startSymbol('%%');
    $interpolateProvider.endSymbol('%%');
  });

  app.controller('CountryListController', ['$http', function($http) {
    var _self = this;
    // Data.
    this.countries = [];
    
    setupCommonCountryListMethods(_self);
    // Set sort.
    this.sortExpScoreField = '-score';
    this.setSortExpression('score');

    var url = CS.domain + '/' + CS.lang + '/api/regions/' + CS.regionId + '.json';
    $http.get(url).success(function(data) {
      _self.countries = data.countries;
    });

  }]);
})();