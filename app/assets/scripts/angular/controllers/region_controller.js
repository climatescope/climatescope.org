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

  app.controller('DescriptionAccordionController', [function() {
    this.initAccordion = function(target) {
      var $target = $(target);
      // Perform transformation on the page content.
      // Content comes from markdown like:
      // h4+p+p+h4 ...
      // Basically we wrap a section around a set of h4+p until the next h4.
      var transformed = $.map($('h4', $target), function (o, i) {
        var headings = $(o).nextUntil('h4')

        // Section to contain elements.
        var $section = $('<section>').addClass('prose-block');
        // Prepare title link.
        var $titleLink = $('<a href="#">').addClass('prose-block__toggle').append(o);
        // Construct header.
        $('<header>')
          .addClass('prose-block__header')
          .append($titleLink)
          .appendTo($section);

        // Container for the text.
        var $container = $('<div>').addClass('prose-block__body');
        $container.append(headings);
        $container.appendTo($section);

        // Accordion listener.
        $titleLink.click(function (e) {
          e.preventDefault();
          $titleLink.closest('.prose-block').toggleClass('prose-block--expanded')
        });

        return $section;
      });

      $target.append(transformed);
    }
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