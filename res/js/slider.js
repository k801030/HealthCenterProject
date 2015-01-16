angular.module('slider', ['ui.bootstrap'])

// Controller  for Carousel
.controller('CarouselCtrl', ['$scope', function($scope) {
// initializing the time Interval 
$scope.myInterval = 5000;
   
 // Initializing  slide rray   
$scope.slides = [
<<<<<<< HEAD
  {image:'res/images/sliders/1.jpg',title:'id1', text:'馬偕醫院淡水分區，期望帶給大家健康溫馨的生活。'},
  
  {image:'res/images/sliders/2.jpg',title:'', text:'夏天、海洋。'},

  {image:'res/images/sliders/3.jpg',title:'', text:'自然。'}];
=======
  {image:'res/images/sliders/1.jpg',title:'id1', text:'第一張描述'},
  
  {image:'res/images/sliders/1.jpg',title:'id2', text:'第二張描述'},

  {image:'res/images/sliders/2.jpg',title:'', text:'台北院區：(10449)台北市中山區中山北路二段92號　電話：(02)2543-3535　傳真：(02)2543-3642'},

  {image:'res/images/sliders/3.jpg',title:'', text:'Image 4'}];
>>>>>>> 0a87c9599c2eec35776bd4253544cb332384ce4a

  var slides = $scope.slides;

}])
