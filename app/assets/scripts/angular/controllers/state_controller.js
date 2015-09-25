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
    this.chartData = {
      'clean-energy-investments': null,
      'installed-capacity': null,
      'carbon-offset': null
    }

    setupCommonParamDetailTableMethods(_self);

    var url = CS.domain + '/' + CS.lang + '/api/countries/' + CS.stateId + '.json';
    $http.get(url).success(function(data) {
      _self.parameters = data.parameters;
    });

    // The following lines load the data for each of the charts.
    // Some of the data needs to be processed before being sent to the chart.
    // This is done by calling the prepareData(). This function is implemented
    // on each of the chart's files.
    var url = null;
    url = CS.domain + '/' + CS.lang + '/api/auxiliary/clean-energy-investments/' + CS.stateId + '.json';
    $http.get(url).success(function(data) {
      chart__clean_energy_investments.prepareData(data);
      _self.chartData['clean-energy-investments'] = data;
    });

    url = CS.domain + '/' + CS.lang + '/api/auxiliary/installed-capacity/' + CS.stateId + '.json';
    $http.get(url).success(function(data) {
      chart__installed_capacity.prepareData(data);
      _self.chartData['installed-capacity'] = data;
    });

    url = CS.domain + '/' + CS.lang + '/api/auxiliary/carbon-offset-projects/' + CS.stateId + '.json';
    $http.get(url).success(function(data) {
      // No data preparation for this one.
      _self.chartData['carbon-offset'] = data;
    });

    url = CS.domain + '/' + CS.lang + '/api/auxiliary/price-attractiveness-electricity/' + CS.stateId + '.json';
    $http.get(url).success(function(data) {
      // No data preparation for this one.
      _self.chartData['price-attractiveness-electricity'] = data;
    });

    url = CS.domain + '/' + CS.lang + '/api/auxiliary/price-attractiveness-fuel/' + CS.stateId + '.json';
    $http.get(url).success(function(data) {
      // No data preparation for this one.
      _self.chartData['price-attractiveness-fuel'] = data;
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
    this.stateStats = {};

    setupPolicyStatsVizMethods(this);

    var url = CS.policyProxy + '/policy?state=' + CS.stateId.toUpperCase();
    $http.get(url).success(function(data) {
      _self.countPolicyTypes(data.listData);
      _self.policyCount = data.metaData.totalResults;
    });
    
    var url = CS.domain + '/' + CS.lang + '/api/countries/' + CS.stateId + '.json';
    $http.get(url).success(function(data) {
      _self.stateStats = data.score[0];
    });

  }]);

})();
