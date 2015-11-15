function initDropdown() {
  $('[data-toggle="dropdown"]').once('dropdown').click(function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    var parent = $(this).parent('.dropdown');
    parent.toggleClass('open');
    
    $('.dropdown.open').not(parent).removeClass('open');
  });
  
  $('body').once('dropdown', function() {
    $(document).click(function() {
      $('.dropdown.open').removeClass('open');
    });
  });
  
}

$(function() {
  initDropdown();

  // Create cookie with language to use on the 404.
  createCookie('CS_lang', CS.lang, null, CS.domain);
});


$(document).ready(function() {
  $('.flexslider').flexslider({
    animation: 'slide',
    // http://stackoverflow.com/questions/11471034/weird-flickering-background-with-multiple-flex-sliders-on-page
    // Css problem doesn't happen anymore because there's no loop.
    useCSS: true,
    animationLoop: false,
    //keyboard: false,
  });
});