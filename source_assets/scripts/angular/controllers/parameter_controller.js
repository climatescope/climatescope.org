(function(){
  var app = angular.module('parameterApp', ['mathFilters', 'ui.bootstrap'], function($interpolateProvider) {
    $interpolateProvider.startSymbol('//');
    $interpolateProvider.endSymbol('//');
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
        value: data.value,
        weight: _self.parameter.weight
      };
      return getTooltipContent_orig([param]);
    };

    // ---- Logic ----
    var url = CS.domain + '/' + CS.lang + '/api/parameters/' + CS.parameterId + '.json';
    $http.get(url).success(function(data) {
      _self.parameter = data;
      _self.countries = data.countries;
      calcAvgScore();
    });

  }]);
})();
