(function() {
  
  CS.policyProxy = 'http://splinter.fs/climatescope/';
  
  // All the results from the API come in object format.
  // Repeats can't be sorted when looping over objects
  // Since we don't need the object key, we can safely
  // convert to array.
  // Another approach: http://justinklemm.com/angularjs-filter-ordering-objects-ngrepeat/
  var objToArray = function(obj) {
    var arr = [];
    angular.forEach(obj, function(value) {
      arr.push(value);
    });
    return arr;
  };
  
  var app = angular.module('policyApp', ['ngRoute'], function($interpolateProvider) {
    $interpolateProvider.startSymbol('//');
    $interpolateProvider.endSymbol('//');
  });
  
  app.filter('nl2br', ['$sce', function($sce){
    return function(msg,is_xhtml) {
      var is_xhtml = is_xhtml || true;
      var breakTag = (is_xhtml) ? '<br />' : '<br>';
      var msg = (msg + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
      return $sce.trustAsHtml(msg);
    };
  }]);
  
  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'policy_list.html',
        controller: 'policyListController',
        controllerAs: 'policyListCtrl',
        reloadOnSearch: false
      })
      .when('/policy/:policyId', {
        templateUrl: 'policy.html',
        controller: 'policyController',
        controllerAs: 'policyCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
  
  app.controller('policyListController', ['$http', '$routeParams', function($http, $routeParams) {
  }]);

  app.controller('policyFiltersController', ['$http', '$filter', '$rootScope', '$location', function($http, $filter, $rootScope, $location) {
    var _self = this;
    
    this.filterData = {};
    
    this.filters = {
      country: null,
      status: null,
      //subsector: null,
      state: null
    };
    
    this.filtersEnabled = false;
    
    // Get the ordered options.
    // This could be done in the html but it's more organised like this.
    this.getSelectOpts = function(field) {
      var data = objToArray(field);
      return $filter('orderBy')(data, 'name');
    };
    
    // Get the filtered options.
    // This could be done in the html but it's more organised like this.
    this.getSelectOptsState = function(field) {
      var data = objToArray(field);
      var filtered = $filter('filter')(data, {countyId: _self.filters.country});
      return $filter('orderBy')(filtered, 'name');
    };
    
    this.disableFilters = function() {
      if (!_self.filtersEnabled) return;
      _self.filtersEnabled = false;
      // Set every filter to null.
      for (var key in _self.filters) {
        _self.filters[key] = null;
      }
      
      $location.search(_self.filters);
      $rootScope.$broadcast('apply-filters', _self.filters);
    };
    
    this.apply = function() {
      // Check if filters are enabled.
      _self.filtersEnabled = false;
      angular.forEach(_self.filters, function(value) {
        if (value != null) {
          _self.filtersEnabled = true;
        }
      });
      
      $location.search(_self.filters);
      $rootScope.$broadcast('apply-filters', _self.filters);
    };
    
    $http.get(CS.policyProxy + 'policy/filter').success(function(data) {
      _self.filterData = data;
    });
    
    // Check if there are filters in the url.
    if (!angular.equals({}, $location.search())) {
      // Set already preset filters.
      angular.extend(_self.filters, $location.search());
      _self.filtersEnabled = true;
      
      // Both the status and subsector have numeric values
      // but when they come from the url they are string.
      // They must be converted to integers in order to work.
      if (_self.filters.status) {
        _self.filters.status = parseInt(_self.filters.status);
      }
      // if (_self.filters.subsector) {
      //   _self.filters.subsector = parseInt(_self.filters.subsector);
      // }
    }
  }]);

  app.controller('policyTableController', ['$http', '$scope', '$location', function($http, $scope, $location) {
    var _self = this;
    
    this.filters = {};
    this.policies = {};
    
    this.loadingData = true;
    
    this.getPolicyLink = function(policy) {
      return '#/policy/' + policy.id;
    };

    var getPolicies = function() {
      _self.loadingData = true;
      
      var queryString = [];
      angular.forEach(_self.filters, function(value, key) {
        if (value !== null) {
          queryString.push(key + '=' + value);
        }
      });
      
      if (queryString.length) {
        queryString = '?' + queryString.join('&');
      }
      else {
        queryString = '';
      }
      
      $http.get(CS.policyProxy + 'policy' + queryString).success(function(data) {
        _self.policies = objToArray(data);
        _self.loadingData = false;
      });
    };

    $scope.$on('apply-filters', function(event, filters) {
      _self.filters = filters;
      _self.loadingData = true;
      getPolicies();
    });
    
    // Check if there are filters in the url.
    if (!angular.equals({}, $location.search())) {
      // Set already preset filters.
      angular.extend(_self.filters, $location.search());
    }
    
    getPolicies();
  }]);

  app.controller('policyController', ['$http', '$routeParams', function($http, $routeParams) {
    var _self = this;
    this.policy = {};
    
    this.loadingData = true;
    
    $http.get(CS.policyProxy + 'policy/' + $routeParams.policyId).success(function(data) {
      _self.policy = data;
      _self.loadingData = false;
    });
  }]);
  
})();