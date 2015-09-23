(function(){
  var app = angular.module('countryApp', ['ngRoute', 'countryAppControllers', 'ui.bootstrap', 'mathFilters', 'csDirectives'], function($interpolateProvider) {
    $interpolateProvider.startSymbol('%%');
    $interpolateProvider.endSymbol('%%');
  });

  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/details', {
        templateUrl: 'in_detail.html',
        controller: 'DetailsTabController',
        controllerAs: 'detailsCtrl',
        activeTab: 'details'
      })
      .when('/states', {
        templateUrl: 'states.html',
        controller: 'StatesTabController',
        controllerAs: 'statesCtrl',
        activeTab: 'states'
      })
     // .when('/case-study', {
     //   templateUrl: 'case_study.html',
     //   controller: 'CaseStudyTabController',
     //   controllerAs: 'caseStudyCtrl',
     //   activeTab: 'case_study'
     // })
      .otherwise({
        redirectTo: '/details'
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
  
  countryAppControllers.controller('ProfileController', ['$http', function($http) {
    var _self = this;
    // Data.
    this.data = {};
    
    this.getIndicatorValue = function(indicator) {
      var value = indicator.value + indicator.unit;
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
    this.policyCount = 0;
    this.countryStats = {};

    var url = CS.policyProxy + '/policy?limit=1&country=' + CS.countryId.toUpperCase();
    $http.get(url).success(function(data) {
      _self.policyCount = data.metaData.totalResults;
    });
    
    // Temporarily use country data on the sidebar.
    CountryData.get(function(data) {
      _self.countryStats = data.score[0];
    });

  }]);

  // Controller for the navigation to activate the right tab.
  countryAppControllers.controller('CountryTabsController', ['$http', '$route', function($http, $route) {
    this.isActive = function(name) {
      return ($route.current) ? $route.current.activeTab == name : false;
    };
  }]);
  
  // Controller for the DETAILS TAB
  countryAppControllers.controller('DetailsTabController', ['$http', '$route', 'CountryData', function($http, $route, CountryData) {
    var _self = this;
    // Data.
    this.parameters = [];
    this.chartData = {
      'clean-energy-investments': null,
      'installed-capacity': null,
      'carbon-offset': null
    }

    setupCommonParamDetailTableMethods(_self);

    CountryData.get(function(data) {
      _self.parameters = data.parameters;
    });

    // The following lines load the data for each of the charts.
    // Some of the data needs to be processed before being sent to the chart.
    // This is done by calling the prepareData(). This function is implemented
    // on each of the chart's files.
    var url = null;
    url = CS.domain + '/' + CS.lang + '/api/auxiliary/clean-energy-investments/' + CS.countryId + '.json';
    $http.get(url).success(function(data) {
      chart__clean_energy_investments.prepareData(data);
      _self.chartData['clean-energy-investments'] = data;
    });

    url = CS.domain + '/' + CS.lang + '/api/auxiliary/installed-capacity/' + CS.countryId + '.json';
    $http.get(url).success(function(data) {
      chart__installed_capacity.prepareData(data);
      _self.chartData['installed-capacity'] = data;
    });

    url = CS.domain + '/' + CS.lang + '/api/auxiliary/carbon-offset-projects/' + CS.countryId + '.json';
    $http.get(url).success(function(data) {
      // No data preparation for this one.
      _self.chartData['carbon-offset'] = data;
    });

  }]);
  
  // Controller for the STATES TAB
  countryAppControllers.controller('StatesTabController', ['$http', '$route', '$location', 'CountryData', function($http, $route, $location, CountryData) {
    var _self = this;
    // Data
    this.states = [];
    this.countryId = CS.countryId;
    // If there are no states for the country redirect.
    if (!CS.countryHasStates) {
      $location.path('/details');
    }

    setupCommonCountryListMethods(_self);
    // Set sort.
    this.setSort('score');

    CountryData.get(function(data) {
      _self.states = data.states;
      // Order states parameter array.
      /*angular.forEach(_self.states, function(state) {
        state.parameters.sort(function(a, b) {
          return a.id > b.id;
        });
      });*/
    });

  }]);
  
  // Controller for the CASE STUDY TAB
  countryAppControllers.controller('CaseStudyTabController', ['$http', '$route', function($http, $route) {
    // code;
  }]);

})();
