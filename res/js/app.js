// angularJS
// include your js module or put it on depend on usage.
angular.module('app', ['basic', 'client'])  

// javascript & jQuery
$(document).ready(function() {

  console.log($( window ).height());
   
  
  // Returns height of HTML document
  $(window).scroll(function() {
    console.log($('nav').height());
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

