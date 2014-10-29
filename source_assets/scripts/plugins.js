// http://unheap.com
$(function() {
  $('.browsehappy').on('click', function() {
  $(this).slideUp('fast');
  });
});

// Modals
(function($) {

  $(function() {
  
    $('[data-modal-id]').click(function(e) {
      e.preventDefault();
      var id = $(this).attr('data-modal-id');
      
      $('#' + id).addClass('revealed');
    });
    
    $('.modal').click(function(e) {
      // Prevent children from triggering this.
      if(e.target == e.currentTarget) {
        $(this).removeClass('revealed');
      }
    });

    $('[data-modal-dismiss]').click(function(e) {
        e.preventDefault();
        $(this).closest('.modal').removeClass('revealed');
    });

  });

})(jQuery);