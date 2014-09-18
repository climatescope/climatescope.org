(function(){
  
  var mathFilters = angular.module('mathFilters', []);
  
  mathFilters.filter('round', function() {
    return function(input, precision) {
      return round(input, precision);
    };
  });
  
})();