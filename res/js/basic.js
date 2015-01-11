angular.module("basic", ['ui.bootstrap'])

.controller('NavController', ['$scope', '$location', '$http', function($scope, $location, $http){
  $scope.navUrl = 'res/ajax/nav.html';
  $scope.navItems;
  $http.get('res/json/nav.json')
    .then(function(res){
      $scope.navItems = res.data;
    });
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

.controller('DropdownCtrl', ['$scope', '$log', function($scope, $log) {

  $scope.toggled = function(open) {
    $log.log('Dropdown is now: ', open);
  };

  $scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
  };
}])
