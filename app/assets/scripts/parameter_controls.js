$(document).ready(function() {
  
  // Stop here if the parameters do not exist.
  if ($('#parameters-controls').length === 0) {
    return;
  }

  var header_height = $('#site-header').outerHeight();
  var parameter_controls = $('#parameters-controls');
  // Include heading/tools elements height + margin-bottom 
  var title_height = 60;

  // Loading fonts is causing a small delay.
  // Delay the header size calculation for a few millis.
  setTimeout(function() { header_height = $('#site-header').outerHeight(); }, 200);
  
  var check_sticky = function() {
     if ($(document).scrollTop() >= header_height) {
       if (!parameter_controls.hasClass('sticky')) {
         parameter_controls.addClass('sticky');
         check_sticky_padding();
       }
     }
     else {
       parameter_controls.removeClass('sticky');
       check_sticky_padding();
     }
  };

  // When the parameter controls become sticky
  // its height must be added as a padding to the parent
  // to make up for its absence.
  var check_sticky_padding = function() {
    if (parameter_controls.css('position') == 'fixed') {
      var parameter_height = parameter_controls.outerHeight() - title_height;
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
  }, 100));

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

      // NOTE:
      // Many time throughout this code, data array will be accessed by
      // the index [0]. This is safe to do because we know that the first value
      // is always the most recent year. The processing script must ensure
      // that the array has the correct order.

      // Helper functions.
      // Update parameters and return new global score.
      var updateParams = function(params, dataIndex) {
        // The data index allows us to calc the score based on the correct year.
        var globalScore = 0;
        angular.forEach(params, function(param) {
          // Update param weight.
          param.weight = data['param-' + param.id] / 100;
          // Country score.
          // Use the most recent value. The other values are for the trendlines.
          globalScore += (param.weight * param.data[dataIndex].value);
        });
        return round(globalScore, 5);
      };

      // Update country scores.
      angular.forEach(countries, function(country) {
        // Update params and calc score for every year.
        angular.forEach(country.score, function(score, index) {
          if (score.value !== null) {
            score.value = updateParams(country.parameters, index);
          }
        });

        // Compute trendline data.
        globalAppScope.countryTable.computeTrendlineData(country);
      });

      // Sort Countries
      countries.sort(function(a, b) {
        return b.score[0].value - a.score[0].value;
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
          // Update params and calc score for every year.
          angular.forEach(state.score, function(score, index) {
            score.value = updateParams(state.parameters, index);
          });

            // Compute trendline data.
            globalAppScope.countryTable.computeTrendlineData(state);
        });
        // Sort states.
        country.states.sort(function(a, b) {
          return b.score[0].value - a.score[0].value;
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
