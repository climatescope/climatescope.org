(function() {
  var modal = $('[data-modal="know-your-user"]');

  // Close the modal before opening the file.
  modal.find('[data-download="direct"]').click(function() {
    trackGA($(this).attr('href'), false);
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
      var data = JSON.stringify({
        'usefulness': usefulness,
        'usage': usage,
        'organization': organization,
        'createdAt': (new Date()).toString()
      });

      $.post('https://climatescope-8fdf8.firebaseio.com/KnowYourUser.json', data)
        .done(function () {
          // Store cookie.
          createCookie('CS_kown_your_user__submit', 'complete', null, CS.domain);

          // Hide errors
          getError('[name="usefulness"]').hide();
          getError('[name="usage"]').hide();
          getError('[name="organization"]').hide();

          // Hide modal.
          modal.removeClass('revealed');

          var url = modal.find('[data-download="direct"]').attr('href');

          // Track GA.
          trackGA(url, true);

          // Open url.
          window.location = url;
        })
        .fail(function (error) {
          alert('An error occurred while saving your response.');
          console.error('firebase post', error);
        });
    }
  });

  var getError = function(field) {
    return modal.find(field).parents('.form-control').find('.error');
  };

  // Add modal action to every data download button.
  $('.data-download').click(function(e) {
    var url = $(this).attr('href');
    // Do show modal if user already filled the survey.
    if (readCookie('CS_kown_your_user__submit') == 'complete') {
      if (url != '#') {
        trackGA(url, true);
      }
      return true;
    }
    e.preventDefault();
    
    if (url == '#') {
      return;
    }

    modal.find('[data-download]')
      .attr('href', url)
      .attr('title', $(this).attr('title'));

    modal.addClass('revealed');
  });

  function trackGA (url, surveyCompleted) {
    var msg = surveyCompleted ? 'Download with Survey' : 'Download without Survey';

    // Extract the filename from string.
    var regExp = new RegExp('\/([a-z0-9-.]+)$');
    var filename = url.match(regExp)[1];

    var label = filename + ' - ' + CS.lang.toUpperCase();
    ga('send', 'event', 'Data', msg, label);
    console.log ('send', 'event', 'Data', msg, label);
  }
})();