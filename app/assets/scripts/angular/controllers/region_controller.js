(function(){
  var app = angular.module('regionApp', ['ui.bootstrap', 'mathFilters', 'csDirectives'], function($interpolateProvider) {
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

    var url = CS.domain + '/' + CS.lang + '/api/regions/' + CS.regionId + '.json';
    $http.get(url).success(function(data) {
      _self.countries = data.countries;
    });
  }]);

  app.controller('DescriptionController', [function() {
    var fakeScope = {};
    // We only want to get a single method out of this.
    setupCommonParamDetailTableMethods(fakeScope);
    this.toggleExpandable = fakeScope.toggleExpandable;

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
  }]);

  app.controller('StatsController', ['$http', function($http) {
    var _self = this;
    // Data.
    this.regionStats = [];

    var url = CS.domain + '/' + CS.lang + '/api/stats.json';
    $http.get(url).success(function(data) {
      _self.regionStats = data.regions;
    });

  }]);
})();