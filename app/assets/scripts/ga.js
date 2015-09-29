/* jshint ignore:start */
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-56170738-1', 'auto');
ga('send', 'pageview');
/* jshint ignore:end */

// Event tracking.
$(document).ready(function() {
  // Track downloads.
  // $('.data-download').click(function(e) {
  //   $(this).attr('target', '_blank');
    
  //   var url = $(this).attr('href');
    
  //   if (url == '#') {
  //     e.preventDefault();
  //     return;
  //   }
    
  //   // Extract the filename from string.
  //   var regExp = new RegExp('\/([a-z0-9-.]+)$');
  //   var filename = url.match(regExp)[1];
    
  //   var label = filename + ' - ' + CS.lang.toUpperCase();
  //   ga('send', 'event', 'Data', 'Download', label);
  // });
});
