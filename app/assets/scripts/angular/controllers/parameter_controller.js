(function(){
  var app = angular.module('parameterApp', ['mathFilters', 'ui.bootstrap', 'csDirectives'], function($interpolateProvider) {
    $interpolateProvider.startSymbol('%%');
    $interpolateProvider.endSymbol('%%');
  });

  app.controller('CountryListController', ['$http', function($http) {
    var _self = this;
    // Data
    this.parameter = {};
    this.countries = [];
    this.scoreAvg = 0;
    
    setupCommonCountryListMethods(_self);
    // Set sort.
    this.sortExpScoreField = '-data[0].value';
    this.setSortExpression('data[0].value');

    var calcAvgScore = function() {
      var score = 0;
      angular.forEach(_self.countries, function(country) {
        score += country.data[0].value;
      });
      _self.scoreAvg = score / _self.countries.length;
    };

    // Since we're not using object, we get a copy of the original
    // getTooltipContent() to be able to simulate a call to the parent.
    var getTooltipContent_orig  = this.getTooltipContent;
    // Override function to only have one parameter.
    this.getTooltipContent = function(data) {
      // The parent getTooltipContent() expects and array of parameter
      // object with all the data. Since we only have the value we
      // need to simulate the object and the array.
      // This is only being done to avoid repeating markup.
      var param = {
        id: _self.parameter.id,
        name: _self.parameter.name,
        data: data,
        weight: _self.parameter.weight
      };
      return getTooltipContent_orig([param]);
    };

    // OVERRIDE.
    // The trendline data needs to be computed.
    // Using a function and returning data in chart-data will result in a
    // infinite digest loop because the chart directive will watch for changes,
    // and the value is returned by the function is not bound to the scope.
    this.computeTrendlineData = function(country) {
      country.trendline = {
        id: _self.parameter.id,
        data: country.data
      };
    };

    // ---- Logic ----
    var url = CS.domain + '/' + CS.lang + '/api/parameters/' + CS.parameterId + '.json';
    $http.get(url).success(function(data) {
      _self.parameter = data;
      _self.countries = data.countries;
      calcAvgScore();
    });

  }]);
  
  app.controller('StatsController', ['$http', '$filter', function($http, $filter) {
    var _self = this;
    // Data.
    this.paramStats = [];

    var url = CS.domain + '/' + CS.lang + '/api/stats.json';
    $http.get(url).success(function(data) {
      // Remove all the data we don't need.
      // From the parameter array of each region, remove all params
      // except current one.
      angular.forEach(data.regions, function(region) {
        region.parameters = $filter('filter')(region.parameters, function(value) {
          return value.id == CS.parameterId;
        });
      });
      
      _self.regionStats = data.regions;
    });
  }]);
})();
