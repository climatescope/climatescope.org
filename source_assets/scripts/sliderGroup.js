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

    // Initialize all sliders.
    sliders.noUiSlider(options);
    
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
      var data = {};
      sliders.each(function(index) {
        var id = $(this).attr('id') || index;
        data[id] = parseFloat($(this).val());
      });
      
      $group.trigger('update-sliders', [data]);      
      
    });
    
    // Initialize locks.
    sliders.each(function() {
      var $slider = $(this);
      // Search for a sibling lock.
      $slider.siblings('.lock').click(function() {
        
        var $lock = $(this);
        if ($lock.hasClass('locked')) {
          $lock.removeClass('locked');
          $slider.removeAttr('disabled');
        }
        else {
          $lock.addClass('locked');
          $slider.attr('disabled', 'disabled');
        }
      });
    });
  }

  $.fn.sliderGroup = function(options) {
    return this.each(function() {
      sliderGroup.apply(this, [options]);
    });
  };
  
})(jQuery);