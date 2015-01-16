// angularJS
// include your js module or put it on depend on usage.
angular.module('app', ['basic', 'client', 'pages']);

// javascript & jQuery
$(document).ready(function() {   
  
  // dynamically adjust nav-bar
  $(window).scroll(function() {
    if($( document ).scrollTop() >= 45) {
      //$('#content').addClass('is-fixed-top');
      //$('#main-nav').addClass('nav-fixed-top');
      $('#main-nav').addClass('skinny');
    } else {
      //$('#content').removeClass('is-fixed-top');
      //$('#main-nav').removeClass('nav-fixed-top');
      $('#main-nav').removeClass('skinny');
    }
  });

});

