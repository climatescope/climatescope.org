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

    setupCommonTableMethods(_self);

    // Override sortfield
    this.sortField = 'data[0].value';

    var calcAvgScore = function() {
      var score = 0;
      angular.forEach(_self.countries, function(country) {
        score += country.data[0].value;
      });
      _self.scoreAvg = score / _self.countries.length;
    };

    this.getCountryUrl = function(country) {
      var iso = country.iso.toLowerCase();
      return _self.getTranslatedUrl('country', iso);
    };

    // Override function to only have one parameter.
    this.getTooltipContent = function(data) {
      var t = '<dl class="params-legend">';
      var className = 'param-' + _self.parameter.id;
      t += '<dt class="' + className + '">';
      t += _self.parameter.name;
      t += '</dt>';
      t += '<dd>';
      t += round(data.value, 2);
      t += '<small>';
      // 0.29 * 100 = 28.999999999999
      // Round to solve the problem.
      t += round(_self.parameter.weight * 100, 2) + '%';
      t += '</small>';
      t += '</dd>';
      t += '</dl>';

      return t;
    };

    // ---- Logic ----
    var url = CS.domain + '/' + CS.lang + '/api/parameters/' + CS.parameterId + '.json';
    $http.get(url).success(function(data) {

      // Order parameter data array and country score
      // so we don't need to search the value every time.
      angular.forEach(data.countries, function(country) {
        country.data.sort(function(a, b) {
          return b.year - a.year;
        });
        country.score.sort(function(a, b) {
          return b.year - a.year;
        });
      });

      _self.parameter = data;
      _self.countries = data.countries;
      calcAvgScore();
    });

  }]);
})();
