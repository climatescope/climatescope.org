(function(){
  var app = angular.module('countryListApp', ['ui.bootstrap', 'mathFilters'], function($interpolateProvider) {
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
      });
    }
    else {
      $http.get(getRequestUrl()).success(function(data) {
        _self.countries = data;
      });
    }

  }]);
})();