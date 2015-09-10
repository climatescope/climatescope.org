(function() {
  var app = angular.module('compareApp', ['ngRoute', 'ui.bootstrap', 'mathFilters', 'csDirectives'], function($interpolateProvider) {
    $interpolateProvider.startSymbol('%%');
    $interpolateProvider.endSymbol('%%');
  });

  app.controller('compareController', ['$http', '$filter', '$rootScope', '$scope', '$location',
  function($http, $filter, $rootScope, $scope, $location) {
    var _self = this;
    this.countries = [];
    // Init options to null to prevent the select from adding an empty option.
    this.compare = [];
    // Allows us to show the countries only when the button is pressed.
    this.compareSelected = [];

    this.apply = function() {
      //console.log(_self.compare);
      var qstring = {
        compare: _self.compare[0] ? _self.compare[0] : null,
        with: _self.compare[1] ? _self.compare[1] : null
      };
      computeSelected();
      $location.search(qstring);

      handleCharts();
    };

    this.reset = function() {
      var qstring = {
        compare: null,
        with: null
      };
      $location.search(qstring);

      _self.compare = [];
      _self.compareSelected = [];
    };

    this.getOptgroupLabel = function(country) {
      switch (country.iso) {
        case 'cn':
          return CS.t('Chinese provinces');
        case 'in':
          return CS.t('Indian states');
      }
    };

    this.getRegionUrl = function(id) {
      return CS.regionIndex[id];
    };

    this.getCountryUrl = function(iso) {
      return CS.countryIndex[iso];
    };

    /**
     * When the comparison countries change the chart data is loaded.
     * The compare page requires the chart data to be prepared in a special
     * way. The Y domain must be the same in the case of the line and area
     * charts.
     * So the data must be loaded by the controller instead of the chart itself.
     *
     * What happens here:
     *  - The data is loaded for every chart.
     *  - The prepareDataCompare() is called (when needed), passing all the
     *  data in the compareSelected object (all the data being compared)
     *  - The function prepares the data (compute the yDomain, stack data)
     *  in the way each chart needs. (the functions are declared int each
     *  chart file.)
     */
    var handleCharts = function() {
      // Loop over the countries being compared.
      for (var c in _self.compareSelected) {
        // Safe check to ensure that there's country data already.
        if (_self.compareSelected[c]) {
          // console.log('loading data for', _self.compareSelected[c].iso);
          loadChartData('clean-energy-investments', _self.compareSelected[c], function(chartName) {
            // START computing the y domain.
              chart__clean_energy_investments.prepareDataCompare(_self.compareSelected);
            // END computing the y domain.
          });

          loadChartData('installed-capacity', _self.compareSelected[c], function(chartName) {
            // START stack values and compute the y domain.
            chart__installed_capacity.prepareDataCompare(_self.compareSelected);
            // END stack values and compute the y domain.
          });

          // This chart doesn't need data preparation.
          loadChartData('carbon-offset-projects', _self.compareSelected[c]);
        }
      }
    };

    /**
     * Loads the data for a specific chart of a country and executes a
     * callback when done.
     */
    var loadChartData = function(chartName, countryData, callback) {
      var url = CS.domain + '/' + CS.lang + '/api/auxiliary/' + chartName + '/' + countryData.iso + '.json';
      $http.get(url).success(function(data) {
        //console.log('loaded', countryData.iso);
        if (!countryData.chartData) {
          countryData.chartData = {};
        }
        countryData.chartData[chartName] = data;

        if (callback) {
          callback(chartName, countryData);
        }
      });
    }

    var getCountry = function(prop, val) {
      for (var i in _self.countries) {
        if (_self.countries[i][prop] == val) {
          return _self.countries[i];
        }
      }
      return null;
    };

    var getState = function(iso) {
      var countryIso = iso.split('-');
      var country = getCountry('iso', countryIso[0]);

      if (!country) {
        return null;
      }

      for (var i in country.states) {
        if (country.states[i].iso == iso) {
          return country.states[i];
        }
      }
      return null;
    };

    var computeSelected = function() {
      for (var c in _self.compare) {
        if (_self.compare[c] && _self.compare[c].length > 3) {
          var countryIso = _self.compare[c].split('-');
          var country = getCountry('iso', countryIso[0]);
          // State
          _self.compareSelected[c] = getState(_self.compare[c]);
          // Store a reference to the parent to be able to show the subtitle.
          if (_self.compareSelected[c]) {
            _self.compareSelected[c].parent = country;
          }
        }
        else {
          // Country
          _self.compareSelected[c] = getCountry('iso', _self.compare[c]);
        }
      }

      // console.log('_self.compareSelected', _self.compareSelected);
      // console.log('_self.compare', _self.compare);
    };

    $http.get(CS.domain + '/' + CS.lang + '/api/countries.json').success(function(data) {
      _self.countries = data;
      computeSelected();

      handleCharts();
      //console.log('request finished');
    });

    $rootScope.$on('$locationChangeSuccess', function() {
      //console.log('$locationChangeSuccess');
      var qstring = $location.search();

      if (qstring.compare) {
        _self.compare[0] = qstring.compare.toLowerCase();
      }
      if (qstring.with) {
        _self.compare[1] = qstring.with.toLowerCase();
      }

      // Update url of share options.
      $scope.currentPath = $location.url();

      computeSelected();
      handleCharts();
    });

  }]);

})(); 