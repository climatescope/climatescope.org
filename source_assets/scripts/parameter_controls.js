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
    $('#res').html('p1: ' + data['p1'] + '<br>p2: ' + data['p2'] + '<br>p3: ' + data['p3'] + '<br>p4: ' + data['p4']);
  });
  
});
