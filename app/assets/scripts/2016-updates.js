$(window).load(function() {
  if (readCookie('CS_2016_update') != 'hidden') {
    var modal = $('[data-modal="2016-update"]');
    modal.addClass('revealed');
    
    modal.find('[data-modal-dismiss]').click(function(e) {
      e.preventDefault();
      modal.removeClass('revealed');
      // Create cookie with language to use on the 404.
      createCookie('CS_2016_update', 'hidden', null, CS.domain);
    });
  }

});
