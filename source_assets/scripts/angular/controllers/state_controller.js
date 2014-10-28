(function(){
  var app = angular.module('stateApp', ['ui.bootstrap', 'mathFilters', 'csDirectives'], function($interpolateProvider) {
    $interpolateProvider.startSymbol('%%');
    $interpolateProvider.endSymbol('%%');
  });
  
  // Controller for the DETAILS
  app.controller('DetailsController', ['$http', function($http) {
    var _self = this;
    // Data.
    this.parameters = [];

    setupCommonParamDetailTableMethods(_self);

    var url = CS.domain + '/' + CS.lang + '/api/countries/' + CS.stateId + '.json';
    $http.get(url).success(function(data) {
      _self.parameters = data.parameters;
    });
  }]);

  app.controller('ProfileController', ['$http', function($http) {
    var _self = this;
    // Data.
    this.data = {};
    
    this.getIndicatorValue = function(indicator) {
      var value = indicator.value + indicator.unit;
      return value;
    };

    var url = CS.domain + '/' + CS.lang + '/api/countries-profile/' + CS.stateId + '.json';
    $http.get(url).success(function(data) {
      _self.data = data;
    });

  }]);

  app.controller('StatsController', ['$http', function($http) {
    var _self = this;
    // Data.
    this.policyCount = 0;
    this.stateStats = {};

    var url = CS.policyProxy + '/policy?limit=1&state=' + CS.stateId.toUpperCase();
    $http.get(url).success(function(data) {
      _self.policyCount = data.metaData.totalResults;
    });
    
    var url = CS.domain + '/' + CS.lang + '/api/countries/' + CS.stateId + '.json';
    $http.get(url).success(function(data) {
      _self.stateStats = data.score[0];
    });

  }]);

})();
