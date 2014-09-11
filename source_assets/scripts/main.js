$(function() {
  $('#section-switch a').click(function(e) {
    e.preventDefault();
    
    // Remove all actives.
    $('#section-switch li').removeClass('active');
    // Activate current.
    $(this).parent('li').addClass('active');
    
    // Hide all content.
    $('.tab-content').addClass('hidden');
    //Show clicked
    var dest = $(this).attr('href');
    $(dest).removeClass('hidden');
  });
  
  
  $('[data-toggle="dropdown"]').click(function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    var parent = $(this).parent('.dropdown');
    parent.toggleClass('open');
    
    $('.dropdown.open').not(parent).removeClass('open');
    
  });
  
  $(document).click(function() {
    $('.dropdown.open').removeClass('open');
  });
  
  // Modal cookie.
  // Only show modal the first time the user enters the page.
  // It will be language dependent.
  if (readCookie('welcome_modal') != 'hide') {
    $('#welcome').addClass('revealed');
  }
  
  $('[data-modal-dismiss]').click(function(e) {
    e.preventDefault();
    createCookie('welcome_modal', 'hide', 10, '/' + CS.lang);
  });
  
});
