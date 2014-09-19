(function(){
  var app = angular.module('stateApp', ['ui.bootstrap', 'mathFilters'], function($interpolateProvider) {
    $interpolateProvider.startSymbol('//');
    $interpolateProvider.endSymbol('//');
  });
  
  // Controller for the DETAILS
  app.controller('DetailsController', ['$http', function($http) {
    var _self = this;

    // Data.
    this.parameters = [];

    setupCommonTableMethods(_self);
    setupCommonParamDetailTableMethods(_self);
    
    var url = CS.domain + '/' + CS.lang + '/api/countries/' + CS.stateId + '.json';
    $http.get(url).success(function(data) {
      _self.parameters = data.parameters;
    });
  }]);

})();
