/*
 * SliderGroup plugin.
 * 
 * Makes all the sliders in a group interconnect.
 * Depends on noUiSlider.
 * 
 * $('.slider-group').sliderGroup(options);
 * 
 * The options are the same as used by noUiSlider.
 */
(function($) {
  
  function sliderGroup(options) {
    var $group = $(this);
    var sliders = $('.slider', $group);

    // Returns the sum of all the slider's values.
    var getGroupTotal = function() {
      var total = 0;
      sliders.each(function() {
        total += parseFloat($(this).val());
      });
      return total;
    };

    // Gets the slider's data prepared to send to the listener.
    var getSlidersData = function() {
      var data = {};
      sliders.each(function(index) {
        var id = $(this).attr('id') || index;
        data[id] = parseFloat($(this).val());
      });
      return data;
    };

    // Sets the slider's defaults using the data attribute.
    var setSlidersDefaultValues = function() {
      sliders.each(function() {
        var starting = $(this).attr('data-starting');
        if (!starting) {
          throw Error("sliderGroup: missing 'data-starting' attribute.");
        }
         $(this).val($(this).attr('data-starting'));
      });

      // Send data to event listener as init.
      var data = getSlidersData();
      $group.trigger('update-sliders', [data]);
    };
    
    // Reset Option.
    if (options == 'reset') {
      setSlidersDefaultValues();
      // Unlock.
      sliders.siblings('.lock').find('.switch-checkbox').removeAttr('checked').trigger('change');
      return this;
    }

    // Initialize all sliders.
    sliders.noUiSlider(options);
    setSlidersDefaultValues();
    
    // When setting up the slider the listener is not yet attached
    // to the slider group, so the trigger wouldn't work.
    // By delaying the execution a few millis there is time for the
    // listener to be attached.
    // An alternative to this would be to have a init function callback
    // but let's pick one and go with it.
    setTimeout(function() {
      var data = getSlidersData();
      $group.trigger('update-sliders', [data]);
    }, 10);
    

    sliders.on('slide', function() {
      var _self = this;
      var _selfValue = parseFloat($(this).val());

      // Get total for all sliders.
      var total = getGroupTotal();

      // Get by how much is over 100;
      var delta = 100 - total;

      // Sliders to update. Everyone except the disabled ones and the current.
      var slidersToChange = sliders.not(_self).not('[disabled]');
      var countSliders = slidersToChange.length;

      slidersToChange.each(function() {
        var value = parseFloat($(this).val());
        var new_value = value + (delta / countSliders);
        
        if (new_value < 0 || _selfValue == 100) {
          new_value = 0;
        }
        if (new_value > 100) {
          new_value = 100;
        }
        $(this).val(new_value);
      });

      // Get the updated value of the sliders.
      var updatedTotal = getGroupTotal();
      // Value for other slides.
      var updatedOthersTotal = updatedTotal - _selfValue;

      // Prevent the current slide from going over 100.
      if (updatedTotal != 100) {
        $(_self).val(100 - updatedOthersTotal);
      }

      // Prepare data to send to event listener.  
      var data = getSlidersData();      
      $group.trigger('update-sliders', [data]);
      
    });

    // Initialize locks.
    sliders.each(function() {
      var $slider = $(this);
      // Search for a sibling lock.
      $slider.siblings('.lock').find('.switch-checkbox').change(function() {
        if ($(this).is(':checked')) {
          $slider.attr('disabled', 'disabled');
        }
        else {
          $slider.removeAttr('disabled');
        }
      });
    });
    
    return this;
  }

  $.fn.sliderGroup = function(options) {    
    return this.each(function() {
      return sliderGroup.apply(this, [options]);
    });
  };
  
})(jQuery);