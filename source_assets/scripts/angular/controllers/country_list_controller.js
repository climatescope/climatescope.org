(function(){
  var app = angular.module('countryListApp', ['ui.bootstrap'], function($interpolateProvider) {
    $interpolateProvider.startSymbol('//');
    $interpolateProvider.endSymbol('//');
  });

  app.controller('CountryListController', ['$http', function($http) {
    var _self = this;
    // Data
    this.countries = [];
    
    setupCommonTableMethods(_self);
    
    // Helper function.
    var getRequestUrl = function(regionId) {
      regionId = regionId || null;

      if (regionId == null) {
        return CS.domain + '/' + CS.lang + '/api/countries.json';
      }
      else {
        return CS.domain + '/' + CS.lang + '/api/regions/' + regionId + '.json';
      }
    };
    // Order the parameter array in countries and states.
    var orderParamsArray = function() {
      angular.forEach(_self.countries, function(country) {
        country.parameters.sort(function(a, b) {
          return a.id > b.id;
        });
        angular.forEach(country.states, function(state) {
          state.parameters.sort(function(a, b) {
            return a.id > b.id;
          });
        });
      });
    };

    this.getCountryUrl = function(country) {
      var iso = country.iso.toLowerCase();
      return _self.getTranslatedUrl('country', iso);
    };
    
    this.getStateUrl = function(state) {
      var iso = state.iso.toLowerCase();
      return _self.getTranslatedUrl('state', iso);
    };

    this.toggleStates = function($event) {
      var tbody = jQuery($event.target).closest('tbody');
      var statesRow = tbody.find('.country-states');
      if (statesRow.is(':hidden')) {
        tbody.addClass('open');
        statesRow.trSlideDown();
      }
      else {
        tbody.removeClass('open');
        statesRow.trSlideUp();
      }
    };

    // ---- Logic ----

    if (CS.regionId) {
      $http.get(getRequestUrl(CS.regionId)).success(function(data) {
        _self.countries = data.countries;
        // Order data once available.
        orderParamsArray();
      });
    }
    else {
      $http.get(getRequestUrl()).success(function(data) {
        _self.countries = data;
        // Order data once available.
        orderParamsArray();
      });
    }

  }]);
})();