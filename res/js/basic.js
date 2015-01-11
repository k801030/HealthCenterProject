angular.module("basic", ['ui.bootstrap'])

.config(function($locationProvider) {
  $locationProvider.html5Mode(true); // make hash # available
})

.factory('structure', ['$http', function structureFactory($http) {
  var _data = {content: null};
  $http.get('../res/json/structure.json').then(function(res){
    _data.content = res.data;
  });
  return _data ;
}])

.controller('NavCtrl', ['$scope', '$location', 'structure', function($scope, $location, structure) {
  $scope.navUrl = '../res/ajax/nav.html';
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

.controller('SideBarCtrl', ['$scope', '$location', 'structure', function($scope, $location, structure) {
  //var this.structure = structure;
  $scope.tabSelected;
  
  $scope.setTab = function(num) {
    $scope.tabSelected = num;
  }
  $scope.getTab = function() {
    return $scope.tabSelected;
  }

  $scope.thisContent = function() {
    var urlArray = $location.absUrl().split("/");
    var segment = urlArray[urlArray.length-3];
    if(structure.content == null)  // block when data is not loaded.
      return;
    var length = structure.content.length;
    for(var i=0; i<length; i++){
      if(segment == structure.content[i].main_item.path){
        return structure.content[i].sub_item;
      }
    }
  };

  console.log($location.hash());

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
