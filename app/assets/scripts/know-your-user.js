(function() {

  var modal = $('[data-modal="know-your-user"]');

  // Close the modal before opening the file.
  modal.find('[data-download="direct"]').click(function() {
    modal.removeClass('revealed');
  });

  // Close the modal before opening the file.
  modal.find('form[name="know-your-user"]').submit(function(e) {
    e.preventDefault();
    var $this = $(this);
    var errored = false;

    var usefulness = $this.find('[name="usefulness"]:checked').val();
    var usage = $this.find('[name="usage"]:checked').val();
    var organization = $this.find('[name="organization"]').val();

    if (usefulness === undefined) {
      errored = true;
      getError('[name="usefulness"]').show();
    }
    else {
      getError('[name="usefulness"]').hide();
    }

    if (usage === undefined) {
      errored = true;
      getError('[name="usage"]').show();
    }
    else {
      getError('[name="usage"]').hide();
    }

    if ($.trim(organization) == '') {
      errored = true;
      getError('[name="organization"]').show();
    }
    else {
      getError('[name="organization"]').hide();
    }

    if (!errored) {
      // Submit.
      // Map values with google forms:
      var formData = {
        'entry.709291448': usefulness,
        'entry.1261682105': usage,
        'entry.1368725634': organization
      };

      $.ajax({
        type: "POST",
        url: 'https://docs.google.com/forms/d/1ir4mUopmro3Z0qftpTdA6zfHU4BWNo3B2BlDyJMXi9s/formResponse',
        data: formData,
        dataType: "xml"
      })
      .always(function() {
        console.log('Error but data was written.');

        // Store cookie.
        createCookie('CS_kown_your_user__submit', 'complete', null, CS.domain);

        // Hide errors
        getError('[name="usefulness"]').hide();
        getError('[name="usage"]').hide();
        getError('[name="organization"]').hide();

        // Hide modal.
        modal.removeClass('revealed');

        // Open url.

        // TODO: Uncomment
        // window.location = modal.find('[data-download="direct"]').attr('href');
      });
    }

  });

  var getError = function(field) {
    return modal.find(field).parents('.form-control').find('.error');
  };

  // Add modal action to every data download button.
  $('.data-download').click(function(e) {
    // Do show modal if user already filled the survey.
    if (readCookie('CS_kown_your_user__submit') == 'complete') {
      // TODO: Uncomment
      //return true;
    }

    e.preventDefault();
    var url = $(this).attr('href');
    
    if (url == '#') {
      return;
    }

    modal.find('[data-download]')
      .attr('href', url)
      .attr('title', $(this).attr('title'));

    modal.addClass('revealed');

  });

})();