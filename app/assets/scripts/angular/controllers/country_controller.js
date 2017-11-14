(function(){
  var app = angular.module('countryApp', ['ngRoute', 'countryAppControllers', 'ui.bootstrap', 'mathFilters', 'csDirectives'], function($interpolateProvider) {
    $interpolateProvider.startSymbol('%%');
    $interpolateProvider.endSymbol('%%');
  });

  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/enabling-framework', {
        templateUrl: 'enabling-framework.html',
        controller: 'EnablingFrameworkTabController',
        controllerAs: 'detailsCtrl',
        activeTab: 'enabling-framework'
      })
      .when('/financing-investments', {
        templateUrl: 'financing-investments.html',
        controller: 'FinancingInvestmentsTabController',
        controllerAs: 'detailsCtrl',
        activeTab: 'financing-investments'
      })
      .when('/value-chains', {
        templateUrl: 'value-chains.html',
        controller: 'ValueChainsTabController',
        controllerAs: 'detailsCtrl',
        activeTab: 'value-chains'
      })
      .when('/ghg-management', {
        templateUrl: 'ghg-management.html',
        controller: 'GhgManagementTabController',
        controllerAs: 'detailsCtrl',
        activeTab: 'ghg-management'
      })
      .otherwise({
        redirectTo: '/enabling-framework'
      });
  }]);

  // Service to provide data. Uses a simple cache to avoid making
  // several requests.
  app.factory('CountryData', ['$http', function($http) {
    var cache;
    this.get = function(cb) {
      if (cache) {
        cb(cache);
      }
      else {
        var url = CS.domain + '/' + CS.lang + '/api/countries/' + CS.countryId + '.json';
        $http.get(url).success(function(data) {
          cache = data;
          cb(data);
        });
      }
    };
    return this;
  }]);

  // Module
  var countryAppControllers = angular.module('countryAppControllers', []);
  
  countryAppControllers.controller('DescriptionController', ['CountryData', function(CountryData) {
    var _self = this;
    var fakeScope = {};
    // We only want to get a single method out of this.
    setupCommonParamDetailTableMethods(fakeScope);
    this.toggleExpandable = fakeScope.toggleExpandable;
    this.chartSummary = null;

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

    CountryData.get(function(data) {
      // Global country score
      var valuesData = [{
        id: 'country',
        name: 'Overall score',
        values: data.score
      }];

      var ids = [
        null,
        'enabling-framework',
        'financing-investments',
        'value-chains',
        'ghg-management'
      ];

      valuesData = valuesData
        .concat(data.parameters.map(function(param) {
          return {
            id: ids[param.id],
            name: param.name,
            values: param.data
          };
        }));

      // Clone to avoid messing with the data.
      valuesData = JSON.parse(JSON.stringify(valuesData));
      // Reverse data.
      valuesData = valuesData.map(function(o) {
        o.values.reverse();
        return o;
      });

      var chData = {
        data: valuesData,
        meta: {
          'label-x': 'year',
          'label-y': 'score',
          title: 'Score Summary'
        },
        iso: data.iso,
        name: data.name
      };
      chart__score_summary.prepareData(chData);
      _self.chartSummary = chData;
    });
  }]);
  
  countryAppControllers.controller('ProfileController', ['$http', function($http) {
    var _self = this;
    // Data.
    this.data = {};
    
    this.getIndicatorValue = function(indicator) {
      var value = formatThousands(indicator.value) + indicator.unit;
      return value;
    };

    var url = CS.domain + '/' + CS.lang + '/api/countries-profile/' + CS.countryId + '.json';
    $http.get(url).success(function(data) {
      _self.data = data;
    });

  }]);

  countryAppControllers.controller('StatsController', ['$http', 'CountryData', function($http, CountryData) {
    var _self = this;
    // Data.
    this.countryStats = {};
    this.states = [];

    setupPolicyStatsVizMethods(this);
    setupCommonCountryListMethods(_self);

    // Requests.
    var url = CS.policyProxy + '/policy?country=' + CS.countryId.toUpperCase();
    $http.get(url).success(function(data) {
      _self.countPolicyTypes(data.listData);
      _self.policyCount = data.metaData.totalResults;
    });
    
    // Temporarily use country data on the sidebar.
    CountryData.get(function(data) {
      _self.countryStats = data.score[0];
      _self.states = data.states;
    });

  }]);

  // Controller for the navigation to activate the right tab.
  countryAppControllers.controller('CountryTabsController', ['$http', '$route', function($http, $route) {
    this.isActive = function(name) {
      return ($route.current) ? $route.current.activeTab == name : false;
    };
  }]);

  countryAppControllers.controller('EnablingFrameworkTabController', ['$http', '$route', 'CountryData', function($http, $route, CountryData) {
    var _self = this;
    // Data.
    this.parameters = [];
    this.grid = 'off';
    this.chartData = {
      'installed-capacity': null,
      'price-attractiveness-electricity': null,
      'price-attractiveness-fuel': null,

      'power-sector-1': null,
      'power-sector-2': null,
      'power-sector-3': null,
      'power-sector-4': null,

      'power-sector-offgrid-1': null,
      'power-sector-offgrid-2': null,
      'power-sector-offgrid-3': null,
      'power-sector-offgrid-4': null
    };

    setupCommonParamDetailTableMethods(_self);

    CountryData.get(function(data) {
      _self.parameters = [data.parameters[0]];
    });

    // The following lines load the data for each of the charts.
    // Some of the data needs to be processed before being sent to the chart.
    // This is done by calling the prepareData(). This function is implemented
    // on each of the chart's files.
    var url = null;

    url = CS.domain + '/' + CS.lang + '/api/auxiliary/installed-capacity/' + CS.countryId + '.json';
    $http.get(url).success(function(data) {
      // Data for this chart requires preparation.
      chart__installed_capacity.prepareData(data);
      _self.chartData['installed-capacity'] = data;
    });

    url = CS.domain + '/' + CS.lang + '/api/auxiliary/price-attractiveness-electricity/' + CS.countryId + '.json';
    $http.get(url).success(function(data) {
      _self.chartData['price-attractiveness-electricity'] = data;
    });

    url = CS.domain + '/' + CS.lang + '/api/auxiliary/price-attractiveness-fuel/' + CS.countryId + '.json';
    $http.get(url).success(function(data) {
      _self.chartData['price-attractiveness-fuel'] = data;
    });

    url = CS.domain + '/' + CS.lang + '/api/auxiliary/power-sector-1/' + CS.countryId + '.json';
    $http.get(url).success(function(data) {
      _self.chartData['power-sector-1'] = data;
    });

    url = CS.domain + '/' + CS.lang + '/api/auxiliary/power-sector-2/' + CS.countryId + '.json';
    $http.get(url).success(function(data) {
      _self.chartData['power-sector-2'] = data;
    });

    url = CS.domain + '/' + CS.lang + '/api/auxiliary/power-sector-3/' + CS.countryId + '.json';
    $http.get(url).success(function(data) {
      _self.chartData['power-sector-3'] = data;
    });

    url = CS.domain + '/' + CS.lang + '/api/auxiliary/power-sector-4/' + CS.countryId + '.json';
    $http.get(url).success(function(data) {
      _self.chartData['power-sector-4'] = data;
    });

    if (CS.grid === 'off') {
      url = CS.domain + '/' + CS.lang + '/api/auxiliary/power-sector-offgrid-1/' + CS.countryId + '.json';
      $http.get(url).success(function(data) {
        _self.chartData['power-sector-offgrid-1'] = data;
      });

      url = CS.domain + '/' + CS.lang + '/api/auxiliary/power-sector-offgrid-2/' + CS.countryId + '.json';
      $http.get(url).success(function(data) {
        _self.chartData['power-sector-offgrid-2'] = data;
      });

      url = CS.domain + '/' + CS.lang + '/api/auxiliary/power-sector-offgrid-3/' + CS.countryId + '.json';
      $http.get(url).success(function(data) {
        _self.chartData['power-sector-offgrid-3'] = data;
      });

      url = CS.domain + '/' + CS.lang + '/api/auxiliary/power-sector-offgrid-4/' + CS.countryId + '.json';
      $http.get(url).success(function(data) {
        _self.chartData['power-sector-offgrid-4'] = data;
      });
    } else {
      _self.grid = 'on';
    };
  }]);

  countryAppControllers.controller('FinancingInvestmentsTabController', ['$http', '$route', 'CountryData', function($http, $route, CountryData) {    var _self = this;
    // Data.
    this.parameters = [];
    this.grid = 'off';
    this.chartData = {
      'clean-energy-investments': null
    };

    setupCommonParamDetailTableMethods(_self);

    CountryData.get(function(data) {
      _self.parameters = [data.parameters[1]];
    });

    // The following lines load the data for each of the charts.
    // Some of the data needs to be processed before being sent to the chart.
    // This is done by calling the prepareData(). This function is implemented
    // on each of the chart's files.
    var url = null;
    url = CS.domain + '/' + CS.lang + '/api/auxiliary/clean-energy-investments/' + CS.countryId + '.json';
    $http.get(url).success(function(data) {
      // Data for this chart requires preparation.
      chart__clean_energy_investments.prepareData(data);
      _self.chartData['clean-energy-investments'] = data;
    });
  }]);

  countryAppControllers.controller('ValueChainsTabController', ['$http', '$route', 'CountryData', function($http, $route, CountryData) {    var _self = this;
    // Data.
    this.parameters = [];
    this.grid = 'off';
    this.chartData = {
      'value-chains': null
    };

    setupCommonParamDetailTableMethods(_self);

    CountryData.get(function(data) {
      _self.parameters = [data.parameters[2]];
    });

    // The following lines load the data for each of the charts.
    // Some of the data needs to be processed before being sent to the chart.
    // This is done by calling the prepareData(). This function is implemented
    // on each of the chart's files.
    var url = null;
    url = CS.domain + '/' + CS.lang + '/api/auxiliary/value-chains/' + CS.countryId + '.json';
    $http.get(url).success(function(data) {
      _self.chartData['value-chains'] = data;
    });
  }]);

  countryAppControllers.controller('GhgManagementTabController', ['$http', '$route', 'CountryData', function($http, $route, CountryData) {
    var _self = this;
    // Data.
    this.parameters = [];
    this.grid = 'off';
    this.chartData = {
      'carbon-offset': null
    };

    setupCommonParamDetailTableMethods(_self);

    CountryData.get(function(data) {
      _self.parameters = [data.parameters[3]];
    });

    // The following lines load the data for each of the charts.
    // Some of the data needs to be processed before being sent to the chart.
    // This is done by calling the prepareData(). This function is implemented
    // on each of the chart's files.
    var url = null;
    url = CS.domain + '/' + CS.lang + '/api/auxiliary/carbon-offset-projects/' + CS.countryId + '.json';
    $http.get(url).success(function(data) {
      _self.chartData['carbon-offset'] = data;
    });
  }]);

  countryAppControllers.controller('ActionsMenuController', ['$rootScope', '$scope', '$location', function($rootScope, $scope, $location) {
    $rootScope.$on('$locationChangeSuccess', function() {
      var currentPath = $location.url();
      $scope.getUrl = function (baseUrl) {
        return encodeURIComponent(baseUrl + '#' + currentPath);
      }
      // Update language switcher url.
      updateLangSwitcherUrl(currentPath);
    });
  }]);
})();
