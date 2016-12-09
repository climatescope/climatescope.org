$(window).load(function() {
  var modal = $('[data-modal="modal-intro-video"]');
  var iframe = modal.find('iframe');
  var iframeSrc = iframe.attr('src');

  $('[data-hook="modal:intro-video"]').click(function(e) {
    e.preventDefault();
    iframe.attr('src', iframeSrc);
    modal.addClass('revealed');
  });

  // On dismiss, remove src from iframe to stop the video.
  modal.on('dismiss', function () {
    iframe.removeAttr('src');
  });
});
