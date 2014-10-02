(function() {

  CS.policyProxy = 'http://146.185.136.6/climatescope/';

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
  
  // When switching languages the url must reflect the current one
  // otherwise the page will not load properly.
  // This is done with jQuery because it's outside the angular scope.
  var updateLangSwitcherUrl = function(new_url) {
    $('.lang-menu a').each(function() {
      var url;
      // If the original url is set return it.
      if ($(this).data('orig_href')) {
        url = $(this).data('orig_href');
      }
      // Otherwise store it and return the href value.
      else {
        url = $(this).attr('href');
        $(this).data('orig_href', url);
      }
      url += '#' + new_url;
      $(this).attr('href', url);
    });
  };

  var app = angular.module('policyApp', ['ngRoute', 'ui.bootstrap'], function($interpolateProvider) {
    $interpolateProvider.startSymbol('%%');
    $interpolateProvider.endSymbol('%%');
  });

  app.filter('nl2br', ['$sce', function($sce) {
    return function(msg, is_xhtml) {
      var is_xhtml = is_xhtml || true;
      var breakTag = (is_xhtml) ? '<br />' : '<br>';
      var msg = (msg + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
      return $sce.trustAsHtml(msg);
    };
  }]);

  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl : 'policy_list.html',
      controller : 'policyListController',
      controllerAs : 'policyListCtrl',
      reloadOnSearch : false
    }).when('/policy/:policyId', {
      templateUrl : 'policy.html',
      controller : 'policyController',
      controllerAs : 'policyCtrl'
    }).otherwise({
      redirectTo : '/'
    });
  }]);
  
  app.directive("initDropdown", function() {
    return {
      restrict: 'AE',
      link: function () {
        initDropdown();
      }
    };
  });
  
  app.factory('queryStringData', ['$location', function($location) {
    var _self = this;

    this.filters = {
      country : null,
      status : null,
      //subsector: null,
      state : null
    };

    this.pagination = {
      page: null
    };

    this.sort = {
      'sort-on': 'name',
      'sort-direction': 'asc'
    };

    this.disableFilters = function() {
      // Set every filter to null.
      for (var key in _self.filters) {
        _self.filters[key] = null;
      }
      _self.update();
    };

    this.areFiltersEnabled = function() {
      var control = false;
      angular.forEach(_self.filters, function(value) {
        if (value != null) control = true;
      });
      return control;
    };

    this.setSort = function(field) {
      _self.sort['sort-on'] = field;
      _self.sort['sort-direction'] = _self.sort['sort-direction'] == 'asc' ? 'desc' : 'asc';
      _self.update();
    };

    this.update = function() {
      var queryString = {};
      angular.extend(queryString, _self.filters, _self.pagination, _self.sort);
      $location.search(queryString);
    };

    // Check if there are filters in the url.
    if (!angular.equals({}, $location.search())) {
      // Update language switcher url.
      updateLangSwitcherUrl($location.url());

      // Set already preset filters.
      var data = $location.search();
      for (var key in _self.filters) {
        _self.filters[key] = data[key] || null;
      }

      // Both the status and subsector have numeric values
      // but when they come from the url they are string.
      // They must be converted to integers in order to work.
      if (_self.filters.status) {
        _self.filters.status = parseInt(_self.filters.status);
      }
      // if (_self.filters.subsector) {
      //   _self.filters.subsector = parseInt(_self.filters.subsector);
      // }

      // Set already preset pagination.
      for (var key in _self.pagination) {
        _self.pagination[key] = data[key] || null;
      }

      // Set already preset sort.
      for (var key in _self.sort) {
        _self.sort[key] = data[key] || null;
      }
    }

    return this;
  }]);

  app.controller('policyListController', function() {});

  app.controller('policyFiltersController', ['$http', '$filter', '$rootScope', '$scope', '$location', 'queryStringData', function($http, $filter, $rootScope, $scope, $location, queryStringData) {
    var _self = this;

    this.filterData = {};
    this.filters = queryStringData.filters;
    this.filtersEnabled = queryStringData.areFiltersEnabled();

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
      var filtered = $filter('filter')(data, { countryId : _self.filters.country || null });
      return $filter('orderBy')(filtered, 'name');
    };

    this.disableFilters = function() {
      if (!_self.filtersEnabled) return;
      
      _self.filtersEnabled = false;
      queryStringData.disableFilters();
      
      $rootScope.$broadcast('apply-filters', _self.filters);
    };

    this.apply = function() {
      // Check if filters are enabled.
      _self.filtersEnabled = queryStringData.areFiltersEnabled();
      queryStringData.update();

      $rootScope.$broadcast('apply-filters', _self.filters);
    };

    $http.get(CS.policyProxy + 'policy/filter').success(function(data) {
      _self.filterData = data;
    });

    $rootScope.$on('$locationChangeSuccess', function() {
      $scope.currentPath = $location.url();
      // Update language switcher url.
      updateLangSwitcherUrl($location.url());
    });

  }]);

  app.controller('policyTableController', ['$http', '$scope', '$location', '$templateCache', 'queryStringData', function($http, $scope, $location, $templateCache, queryStringData) {
    var _self = this;

    // Override pagination template.
    $templateCache.put("template/pagination/pagination.html",
      "<div class='pagination-wrapper'>\n" +
      "  <ul class='pagination bttn-group bttn-group-s bttn-list'>\n" +
      "    <li ng-repeat='page in pages'><a class='bttn bttn-default' ng-class='{active: page.active, disabled: page.disabled}' ng-click='selectPage(page.number)'>{{page.text}}</a></li>\n" +
      "  </ul>\n" +
      "</div>");

    this.filters = queryStringData.filters;
    this.sort = queryStringData.sort;
    this.policies = {};

    this.loadingData = true;

    // Pagination.
    this.currentPage = queryStringData.pagination.page || 1;
    this.totalItems = 0;
    this.itemsPerPage = 50;
    // Pages to show in the pager.
    this.pagesToShow = 5;

    // Sort default.
    this.sort = queryStringData.sort;

    this.setSort = function(field) {
      queryStringData.setSort(field);
      getPolicies();
    };

    this.checkSortClasses = function(field) {
      if (_self.sort['sort-on'] != field) {
        return 'sort-none';
      }
      else if (_self.sort['sort-direction'] == 'desc') {
        return 'sort-desc';
      }
      else {
        return 'sort-asc';
      }
    };

    this.getPolicyLink = function(policy) {
      return '#/policy/' + policy.id;
    };

    // List of stuff to show in the tooltip.
    this.getTooltipContentList = function(list) {
      var data = [];
      for (var i in list) {
        // The first element is already printed.
        if (i == 0) continue;
        data.push(list[i].name);
      }
      return data.join(', ');
    };

    this.changePage = function(page) {
      _self.currentPage = page;
      // Update query string.
      queryStringData.pagination.page = page;
      queryStringData.update();
      // Reload policies.
      getPolicies();
    };

    var getPolicies = function() {
      _self.loadingData = true;

      var queryString = [];
      // Pagination.
      queryString.push('limit=' + _self.itemsPerPage);
      queryString.push('offset=' + ((_self.currentPage - 1) * _self.itemsPerPage));

      // Filters.
      angular.forEach(_self.filters, function(value, key) {
        if (value !== null) {
          queryString.push(key + '=' + value);
        }
      });
      
      // Sort.
      angular.forEach(_self.sort, function(value, key) {
        if (value !== null) {
          queryString.push(key + '=' + value);
        }
      });

      if (queryString.length) {
        queryString = '?' + queryString.join('&');
      } else {
        queryString = '';
      }

      $http.get(CS.policyProxy + 'policy' + queryString).success(function(data) {
        _self.policies = data.listData;
        _self.totalItems = data.metaData.totalResults;
        _self.loadingData = false;
      });
    };

    $scope.$on('apply-filters', function(event, filters) {
      _self.loadingData = true;
      getPolicies();
    });

    getPolicies();
  }]);

  app.controller('policyController', ['$http', '$routeParams', '$location', '$scope', function($http, $routeParams, $location, $scope) {
    // Update language switcher url.
    $scope.currentPath = $location.url();
    // Update language switcher url.
    updateLangSwitcherUrl($location.url());

    var _self = this;
    this.policy = {};

    this.loadingData = true;

    $http.get(CS.policyProxy + 'policy/' + $routeParams.policyId).success(function(data) {
      _self.policy = data;
      _self.loadingData = false;
    });
  }]);

})(); 