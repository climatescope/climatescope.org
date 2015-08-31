(function(){
  
  var directives = angular.module('csDirectives', []);
  
  directives.directive("initChart", function() {
    return {
      restrict: 'A',
      scope: {
        chart_to_load: '@initChart',
        iso: '='
      },
      link: function (scope, element, attr) {
        var chart = null;
        // Initialise the chart and return an object that
        // has a draw method. This will be used to redraw
        // the chart on window resize.
        switch(scope.chart_to_load) {
          case 'installed_capacity':
            chart = chart__installed_capacity(attr.id, scope.iso);
          break;
          case 'clean_energy_investments':
            chart = chart__clean_energy_investments(attr.id, scope.iso);
          break;
          case 'carbon_offset':
            chart = chart__carbon_offset(attr.id, scope.iso);
          break;
        }
        
        if (chart) {
          var resize_func = debounce(function() {
            chart.draw();
          }, 100);

          $(window).on('resize', resize_func);
          
          scope.$on("$destroy", function(event) {
             $(window).off('resize', resize_func);
          });

          // Redraw on iso change.
          scope.$watch('iso', function(value){
            chart.fetch(value);
          });

        }
      }
    };
  });

})();