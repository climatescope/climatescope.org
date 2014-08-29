(function(){
  var app = angular.module('countryApp', [], function($interpolateProvider) {
    $interpolateProvider.startSymbol('//');
    $interpolateProvider.endSymbol('//');
  });
  
  app.controller('CountryListController', ['$http', function($http) {
    _self = this;
    this.countries = [];

    this.sortField = 'overall_ranking';
    this.sortReverse = false;
    
    var requestUrl = CS.domain + '/' + CS.lang + '/api/countries.json';
    $http.get(requestUrl).success(function(data) {
      _self.countries = data;
    });
    
    this.setSort = function(field) {
      _self.sortField = field;
      _self.sortReverse = !_self.sortReverse;
    };
    
    this.calcBarSegment = function(param) {
      weight = param.weight != null ? param.weight : 0.25; 
      return ( param.value * weight * (100/5) ) + '%';
    };
    
  }]);
})();
