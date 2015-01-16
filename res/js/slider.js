angular.module('slider', ['ui.bootstrap'])

// Controller  for Carousel
.controller('CarouselCtrl', ['$scope', function($scope) {
// initializing the time Interval 
$scope.myInterval = 5000;
   
 // Initializing  slide rray   
$scope.slides = [
  {image:'res/images/sliders/1.jpg',title:'id1', text:'第一張描述'},
  
  {image:'res/images/sliders/1.jpg',title:'id2', text:'第二張描述'},

  {image:'res/images/sliders/2.jpg',title:'', text:'台北院區：(10449)台北市中山區中山北路二段92號　電話：(02)2543-3535　傳真：(02)2543-3642'},

  {image:'res/images/sliders/3.jpg',title:'', text:'Image 4'}];

  var slides = $scope.slides;

}])
