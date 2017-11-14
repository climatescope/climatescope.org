(function(){
  var app = angular.module('globalApp', ['ui.bootstrap', 'mathFilters', 'csDirectives'], function($interpolateProvider) {
    $interpolateProvider.startSymbol('%%');
    $interpolateProvider.endSymbol('%%');
  });

  app.controller('CountryListController', ['$http', function($http) {
    var _self = this;
    // Data.
    this.countries = [];
    
    setupCommonCountryListMethods(_self);
    // Set sort.
    this.sortExpScoreField = '-score[0].value';
    this.setSortExpression('score[0].value');

    var url = CS.domain + '/' + CS.lang + '/api/countries.json';
    $http.get(url).success(function(data) {
      // Filter countries if region is set on the url.
      var region = getQueryString().region;
      if (region) {
        _self.countries = data.filter(function(o) {
          return o.region.id === region;
        });
      } else {
        _self.countries = data;
      }
    });
  }]);

  app.controller('ToolsListController', function() {
    this.tools = arrayShuffle(CS.toolsData).slice(0, 3);
  });

  app.controller('ResultsPageController', function() {
    var _self = this;

    this.options = [
      {
        id: null,
        name: 'All regions'
      },
      {
        id: 'asia',
        name: 'Asia'
      },
      {
        id: 'africa',
        name: 'Africa'
      },
      {
        id: 'eu',
        name: 'Europe'
      },
      {
        id: 'lac',
        name: 'Latin America and The Caribbean'
      },
      {
        id: 'me',
        name: 'Middle East'
      }
    ];

    this.getPath = function (base, opt) {
      if (opt.id) {
        return base + '?region=' + opt.id;
      }

      return base;
    };

    switch (getQueryString().region) {
      case 'asia':
        this.selectedRegion = 'Asia';
        break;
      case 'africa':
        this.selectedRegion = 'Africa';
        break;
      case 'eu':
        this.selectedRegion = 'Europe';
        break;
      case 'lac':
        this.selectedRegion = 'Latin America and The Caribbean';
        break;
      case 'me':
        this.selectedRegion = 'Middle East';
        break;
      default:
        this.selectedRegion = 'All regions';
        break;
    }
  });
})();

function arrayShuffle (array) {
  // Poor man clone.
  array = JSON.parse(JSON.stringify(array));
  var ln = array.length;
  var shuffled = [];

  while (ln > 0) {
    var j = Math.floor(Math.random() * (ln));
    shuffled.push(array.splice(j, 1)[0]);
    ln--;
  }

  return shuffled;
}
