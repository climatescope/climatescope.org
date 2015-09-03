$(window).load(function() {

  if (readCookie('CS_survey_notification') != 'hidden') {
    $('#survey-overlay').addClass('revealed');

    $('#survey-overlay .close').click(function(e) {
      e.preventDefault();
      $('#survey-overlay').removeClass('revealed');
      // Create cookie with language to use on the 404.
      createCookie('CS_survey_notification', 'hidden', null, CS.domain);
    });
  }

});
