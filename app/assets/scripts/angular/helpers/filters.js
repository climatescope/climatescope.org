(function(){
  
  var mathFilters = angular.module('mathFilters', []);
  
  mathFilters.filter('round', function() {
    return function(input, precision) {
      return round(input, precision);
    };
  });
  
  mathFilters.filter('leadingZero', function() {
    return function(input, digits) {
      if (isNaN(input) || input === null) {
        return null;
      }
      var count = input.toString().length;
      if (count < digits) {
        var total = digits - count;
        for (var i = 0; i < total; i++) {
          input = '0' + input;
        }
      }
      return input;
    };
  });
  
})();