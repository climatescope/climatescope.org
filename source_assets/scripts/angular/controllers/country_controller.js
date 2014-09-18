(function(){
  var app = angular.module('countryApp', ['ngRoute', 'countryAppControllers', 'ui.bootstrap', 'mathFilters'], function($interpolateProvider) {
    $interpolateProvider.startSymbol('//');
    $interpolateProvider.endSymbol('//');
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
      .when('/case-study', {
        templateUrl: 'case_study.html',
        controller: 'CaseStudyTabController',
        controllerAs: 'caseStudyCtrl',
        activeTab: 'case_study'
      })
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

    CountryData.get(function(data) {
      _self.parameters = data.parameters;
    });
  }]);
  
  // Controller for the STATES TAB
  countryAppControllers.controller('StatesTabController', ['$http', '$route', '$location', 'CountryData', function($http, $route, $location, CountryData) {
    var _self = this;

    // If there are no states for the country redirect.
    if (!CS.countryHasStates) {
      $location.path('/details');
    }

    // Data
    this.states = [];

    setupCommonTableMethods(_self);

    this.getStateUrl = function(state) {
      var iso = state.iso.toLowerCase();
      return _self.getTranslatedUrl('state', iso);
    };

    CountryData.get(function(data) {
      _self.states = data.states;
    });

  }]);
  
  // Controller for the CASE STUDY TAB
  countryAppControllers.controller('CaseStudyTabController', ['$http', '$route', function($http, $route) {
    // code;
  }]);

})();
