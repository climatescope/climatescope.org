// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
/* jshint unused: false */
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
}

// Table row slideUp and slideDown.
// This is not a general approach as it only works for the states
// because you have two tr inside a tbody.
(function($) {
  $.fn.trSlideUp = function() {
    return this.filter('tr').each(function() {
      var _self = $(this);

      _self.children("td").each(function() {
        if ($(this).children("div.tr-slide-wrapper").length === 0) {
          $(this).wrapInner("<div class='tr-slide-wrapper'></div>");
        }
        $(this).children("div.tr-slide-wrapper").slideUp(function() {
          _self.hide();
        });
      });
    });
  };

  $.fn.trSlideDown = function() {
    return this.filter('tr').each(function() {
      var _self = $(this);
      _self.show();

      _self.children("td").each(function() {
        if ($(this).children("div.tr-slide-wrapper").length === 0) {
          // If the wrapping is done before showing the data, the divs
          // must be hidden.
          $(this).wrapInner("<div class='tr-slide-wrapper' style='display: none'></div>");
        }
        $(this).children("div.tr-slide-wrapper").slideDown();
      });
    });
  };
})(jQuery);

// Rounds the given number.
// From http://www.jacklmoore.com/notes/rounding-in-javascript/
/* jshint unused: false */
function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}