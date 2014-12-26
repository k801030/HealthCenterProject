angular.module("basic", [])

.controller('NavController', ['$scope', '$location' , function($scope, $location){
  $scope.navUrl = 'ajax/nav.html';
  $scope.isActive = function (viewLocation) {
    // get the last part of url 
    // and return true/false 
    var urlArray = $location.absUrl().split("/");
    var segment = urlArray[urlArray.length-1]; 
    return viewLocation === segment;
  };
  $scope.location = $location.path();
}])

.controller('SideBarController', ['$scope', function($scope){
  
}])
