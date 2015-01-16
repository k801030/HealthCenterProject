angular.module('slider', ['ui.bootstrap'])

// Controller  for Carousel
.controller('CarouselCtrl', ['$scope', function($scope) {
// initializing the time Interval 
$scope.myInterval = 5000;
   
 // Initializing  slide rray   
$scope.slides = [
  {image:'res/images/sliders/1.jpg',title:'id1', text:'馬偕醫院淡水分區，期望帶給大家健康溫馨的生活。'},
  
  {image:'res/images/sliders/2.jpg',title:'', text:'夏天、海洋。'},

  {image:'res/images/sliders/3.jpg',title:'', text:'自然。'}];

  var slides = $scope.slides;

}])
