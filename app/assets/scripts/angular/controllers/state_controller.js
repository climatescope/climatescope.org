(function(){
  var app = angular.module('stateApp', ['ui.bootstrap', 'mathFilters', 'csDirectives'], function($interpolateProvider) {
    $interpolateProvider.startSymbol('%%');
    $interpolateProvider.endSymbol('%%');
  });
  
  app.controller('DescriptionController', [function() {
    var fakeScope = {};
    // We only want to get a single method out of this.
    setupCommonParamDetailTableMethods(fakeScope);
    this.toggleExpandable = fakeScope.toggleExpandable;

    // Note: This is not the angular way of doing things.
    // However moving everything to a directive would prove to be to great
    // of an effort.
    this.checkExpandable = function(target) {
      var $target = $(target);
      var $targetInner = $('.expandable-wrapper', $target);
      var height = $targetInner.height();
      var max = $target.css('max-height').replace('px', '');
      if (height <= max) {
        $target.addClass('revealed');
        $('.prose-copy-actions .bttn').remove();
      }
    };
  }]);
  
  // Controller for the DETAILS
  app.controller('DetailsController', ['$http', function($http) {
    var _self = this;
    // Data.
    this.parameters = [];
    this.chartData = {
      'clean-energy-investments': null,
      'installed-capacity': null,
      'carbon-offset': null,
      'price-attractiveness-electricity': null,
      'price-attractiveness-fuel': null,
      'value-chains': null,

      'power-sector-1': null,
      'power-sector-2': null,
      'power-sector-3': null,
      'power-sector-4': null
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
      // Data for this chart requires preparation.
      chart__clean_energy_investments.prepareData(data);
      _self.chartData['clean-energy-investments'] = data;
    });

    url = CS.domain + '/' + CS.lang + '/api/auxiliary/installed-capacity/' + CS.stateId + '.json';
    $http.get(url).success(function(data) {
      // Data for this chart requires preparation.
      chart__installed_capacity.prepareData(data);
      _self.chartData['installed-capacity'] = data;
    });

    url = CS.domain + '/' + CS.lang + '/api/auxiliary/carbon-offset-projects/' + CS.stateId + '.json';
    $http.get(url).success(function(data) {
      _self.chartData['carbon-offset'] = data;
    });

    url = CS.domain + '/' + CS.lang + '/api/auxiliary/value-chains/' + CS.stateId + '.json';
    $http.get(url).success(function(data) {
      _self.chartData['value-chains'] = data;
    });

    url = CS.domain + '/' + CS.lang + '/api/auxiliary/price-attractiveness-electricity/' + CS.stateId + '.json';
    $http.get(url).success(function(data) {
      _self.chartData['price-attractiveness-electricity'] = data;
    });

    url = CS.domain + '/' + CS.lang + '/api/auxiliary/price-attractiveness-fuel/' + CS.stateId + '.json';
    $http.get(url).success(function(data) {
      _self.chartData['price-attractiveness-fuel'] = data;
    });

    url = CS.domain + '/' + CS.lang + '/api/auxiliary/power-sector-1/' + CS.stateId + '.json';
    $http.get(url).success(function(data) {
      _self.chartData['power-sector-1'] = data;
    });

    url = CS.domain + '/' + CS.lang + '/api/auxiliary/power-sector-2/' + CS.stateId + '.json';
    $http.get(url).success(function(data) {
      _self.chartData['power-sector-2'] = data;
    });

    url = CS.domain + '/' + CS.lang + '/api/auxiliary/power-sector-3/' + CS.stateId + '.json';
    $http.get(url).success(function(data) {
      _self.chartData['power-sector-3'] = data;
    });

    url = CS.domain + '/' + CS.lang + '/api/auxiliary/power-sector-4/' + CS.stateId + '.json';
    $http.get(url).success(function(data) {
      _self.chartData['power-sector-4'] = data;
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
