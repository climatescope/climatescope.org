$(document).ready(function() {
  var d3 = d3 || {};

  var rank = function (parent) {
    // init map here
  };

  // check to see if anything has a class of map
  // if false, probably isn't the index page so do nothing
  var parent = document.querySelectorAll('.map');
  if (!parent.length) return;

  // load the map
  else {
    $.getScript(CS.domain + '/assets/scripts/vendor/d3.v3.min.js', function() {
      rank(parent);
    });
  }

});
