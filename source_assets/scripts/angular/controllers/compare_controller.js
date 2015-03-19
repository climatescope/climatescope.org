(function() {
  var app = angular.module('compareApp', ['ngRoute', 'ui.bootstrap'], function($interpolateProvider) {
    $interpolateProvider.startSymbol('%%');
    $interpolateProvider.endSymbol('%%');
  });

  app.controller('compareController', ['$http', '$filter', '$rootScope', '$scope', '$location',
  function($http, $filter, $rootScope, $scope, $location) {
    var _self = this;
    this.countries = [];
    this.compare = [];

    this.apply = function() {
      console.log(_self.compare);
      var qstring = {
        compare: _self.compare[0] ? _self.compare[0].iso : null,
        with: _self.compare[1] ? _self.compare[1].iso : null
      };
      $location.search(qstring);
    };

    this.reset = function() {
      var qstring = {
        compare: null,
        with: null
      };
      $location.search(qstring);

      _self.compare = [];
    };

    var getCountry = function(prop, val) {
      for (var i in _self.countries) {
        if (_self.countries[i][prop] == val) {
          return _self.countries[i];
        }
      }
      return null;
    };

    var processQuerystring = function() {
      var qstring = $location.search();
      _self.compare = [];
      // Use "compare" and "with" to make the url prettier.
      if (qstring.compare) {
        _self.compare[0] = getCountry('iso', qstring.compare.toLowerCase());
      }
      if (qstring.with) {
        _self.compare[1] = getCountry('iso', qstring.with.toLowerCase());
      }
    };

    $http.get(CS.domain + '/' + CS.lang + '/api/countries.json').success(function(data) {
      _self.countries = data;
      processQuerystring();
      console.log('request');
    });

    $rootScope.$on('$locationChangeSuccess', function() {
      console.log('$locationChangeSuccess');
      processQuerystring();
    });

  }]);

})(); 