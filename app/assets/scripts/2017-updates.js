$(window).load(function() {
  var modal = $('[data-modal="2017-update"]');
  modal.addClass('revealed');

  // When clicking on close, hide the modal
  modal.find('[data-modal-dismiss]').click(function(e) {
    e.preventDefault();
    modal.removeClass('revealed');
  });
});

// $(window).load(function() {
//   if (readCookie('CS_2017_update') != 'hidden') {
//     var modal = $('[data-modal="2017-update"]');
//     modal.addClass('revealed');

//     // On submit, we set the cookie, but do not hide the modal to be able to
//     // print feedback about the input
//     modal.find('form[name="subscribe-form"]').submit(function(e) {
//       e.preventDefault();
//       // Create cookie with language to use on the 404.
//       createCookie('CS_2017_update', 'hidden', null, CS.domain);
//     });

//     // When clicking on close, only hide the modal and don't set the cookie
//     modal.find('[data-modal-dismiss]').click(function(e) {
//       e.preventDefault();
//       modal.removeClass('revealed');
//       // Create cookie with language to use on the 404.
//       createCookie('CS_2017_update', 'hidden', null, CS.domain);
//     });

//     // No thank you closes the modal and sets the cookie
//     modal.find('[data-download="no-thank-you"]').click(function(e) {
//       e.preventDefault();
//       modal.removeClass('revealed');
//       // Create cookie with language to use on the 404.
//       createCookie('CS_2017_update', 'hidden', null, CS.domain);
//     });
//   }
// });
