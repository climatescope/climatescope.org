$(document).ready(function() {

  // Stop here if the parameters do not exist.
  if ($('#parameters-controls').length === 0) {
    return;
  }

  var header_height = $('#site-header').outerHeight();

  var check_sticky = function() {
     if ($(document).scrollTop() >= header_height) {
       if (!$('#parameters-controls').hasClass('sticky')) {
         $('#parameters-controls').addClass('sticky');
         check_sticky_padding();
       }
     }
     else {
       $('#parameters-controls').removeClass('sticky');
       check_sticky_padding();
     }
  };

  // When the parameter controls become sticky
  // its height must be added as a padding to the parent
  // to make up for its absence.
  var check_sticky_padding = function() {
    var parameter_controls = $('#parameters-controls');
    if (parameter_controls.css('position') == 'fixed') {
      var parameter_height = parameter_controls.outerHeight();
      parameter_controls.parent().css('padding-top', parameter_height);
    }
    else {
      parameter_controls.parent().css('padding-top', 0);
    }
  };

  // Setup listeners.
  $(document).on('scroll', check_sticky);
  $(window).on('resize', debounce(function() {
    header_height = $('#site-header').outerHeight();
    check_sticky_padding();
  }, 50));

  check_sticky();

  var appElement = document.querySelector('[ng-app=globalApp]');
  var globalAppScope = angular.element(appElement).scope();
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
    globalAppScope.$apply(function() {
      var countries = globalAppScope.countryTable.countries;

      // Helper functions.
      // Update parameters and return new global score.
      var updateParams = function(params) {
        var globalScore = 0;
        angular.forEach(params, function(param) {
          // Update param weight.
          param.weight = data['param-' + param.id] / 100;
          // Country score.
          globalScore += (param.weight * param.value);
        });
        return round(globalScore, 5);
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
        if (!country.states) {
          return;
        }
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
    $('.slider-value.param-1').text(data['param-1'] + '%');
    $('.slider-value.param-2').text(data['param-2'] + '%');
    $('.slider-value.param-3').text(data['param-3'] + '%');
    $('.slider-value.param-4').text(data['param-4'] + '%');
  });
  
  // Reset button.
  $('#vis-controls .reset').click(function(e) {
    e.preventDefault();
    $('#vis-controls.slider-group').sliderGroup('reset');
  });
  
});
