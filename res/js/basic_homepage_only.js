angular.module("basic", ['ui.bootstrap'])

.factory('structure', ['$http', function structureFactory($http) {
  var _data = {content: null};
  $http.get('res/json/structure.json').then(function(res){
    _data.content = res.data;
  });
  return _data ;
}])

.controller('NavCtrl', ['$scope', '$location', 'structure', function($scope, $location, structure) {
  $scope.navUrl = 'res/ajax/nav_homepage_only.html';
  $scope.structure = structure;
  
  $scope.isActive = function (viewLocation) {
    // get the last part of url 
    // and return true/false 
    var urlArray = $location.absUrl().split("/");
    var segment = urlArray[urlArray.length-1]; 
    return viewLocation === segment;
  };
  $scope.location = $location.path();


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
