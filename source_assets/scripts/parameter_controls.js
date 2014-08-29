$(document).ready(function() {
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
  
});
