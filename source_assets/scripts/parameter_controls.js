$(document).ready(function() {
  
  // Stop here if the parameters do not exist.
  if ($('#parameters-controls').length === 0) {
    return;
  }
  
  var header_height = $('#site-header').outerHeight();
  
  var check_sticky = function() {
     if ($(document).scrollTop() >= header_height) {
       $('#parameters-controls').addClass('sticky');
     }
     else {
       $('#parameters-controls').removeClass('sticky');
     }
  };
  
  // Setup listeners.
  $(document).on('scroll', check_sticky);
  $(window).on('resize', debounce(function() { header_height = $('#site-header').outerHeight(); }, 50));
  
  check_sticky();
  
  var appElement = document.querySelector('[ng-app=countryListApp]');
  var countryAppScope = angular.element(appElement).scope();
  // Slider group for homepage.
  $('.slider-group').sliderGroup({
    start: 25,
    range: {
      'min': 0,
      'max': 100
    },
    connect: "lower",
    step: 1,
    animate: false
  })
  .on('update-sliders', function(event, data) {
    // Get inside angular scope.
    countryAppScope.$apply(function() {
      var countries = countryAppScope.countryTable.countries;

      // Helper functions.
      // Update parameters and return new global score.
      var updateParams = function(params) {
        var globalScore = 0;
        angular.forEach(params, function(param) {
          // Update param weight.
          param.weight = data[param.id] / 100;
          // Country score.
          globalScore += (param.weight * param.value);
        });
        return Math.round(globalScore * 100) / 100;
      };

      // Update country scores.
      angular.forEach(countries, function(country) {
        // Update params and calc score.
        var newCountryScore = updateParams(country.parameters);
        // Set country score.
        country.score = newCountryScore;
      });

      // Sort Countries
      countries.sort(function(a, b) {
        return b.score - a.score;
      });

      // Based on the array order update the overall ranking.
      angular.forEach(countries, function(country, key) {
        country.overall_ranking = key + 1;

        // Do everything done to countries to the states.
        // --- States ---
        angular.forEach(country.states, function(state) {
          // Update params and calc score.
          var newStateScore = updateParams(state.parameters);
          // Set state score.
          state.score = newStateScore;
        });
        // Sort states.
        country.states.sort(function(a, b) {
          return b.score - a.score;
        });
        // Based on the array order set the overall ranking.
        angular.forEach(country.states, function(state, key) {
          state.state_ranking = key + 1;
        });
        // --- END States ---

      });

    });

    // Temp data!
    $('.slider-value.one').text(data['1'] + '%');
    $('.slider-value.two').text(data['2'] + '%');
    $('.slider-value.three').text(data['3'] + '%');
    $('.slider-value.four').text(data['4'] + '%');
  });
  
  // Reset button.
  $('#vis-controls .reset').click(function(e) {
    e.preventDefault();
    $('#vis-controls.slider-group').sliderGroup('reset');
  });
  
});
