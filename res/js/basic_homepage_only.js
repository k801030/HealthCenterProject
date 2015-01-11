angular.module("basic", ['ui.bootstrap'])

// make hash # available
.config(function($locationProvider) {
  //$locationProvider.html5Mode(true); 
})

// for passing value between pages
.factory('tab', function() {
  var tabSelected;
  
  function set(num) {
    tabSelected = num;
    console.log('set:'+num);
  }
  function get() {
    return tabSelected;
  }

  return {
    set: set,
    get: get
  }

})

// for data sharing
.factory('structure', ['$http', function structureFactory($http) {
  var _data = {content: null};
  $http.get('res/json/structure.json').then(function(res){
    _data.content = res.data;
  });
  return _data ;
}])

.controller('NavCtrl', ['$scope', '$location', 'structure', 'tab', function($scope, $location, structure, tab) {
  $scope.navUrl = 'res/ajax/nav_homepage_only.html';
  $scope.structure = structure;
  $scope.setTab = function(num) {
    tab.set(num);
  }
  $scope.getTab = function() {
    return tab.get();
  }

  $scope.isActive = function (viewLocation) {
    // get the last part of url 
    // and return true/false 
    var urlArray = $location.absUrl().split("/");
    var segment = urlArray[urlArray.length]; 
    return viewLocation === segment;
  };
  $scope.location = $location.path();


}])

.controller('SideBarCtrl', ['$scope', '$location', 'structure', 'tab', function($scope, $location, structure, tab) {
  //var this.structure = structure;
  $scope.setTab = function(num) {
    tab.set(num);
  }
  $scope.getTab = function() {
    return tab.get();
  }

  $scope.thisContent = function() {
    var urlArray = $location.absUrl().split("/");
    var segment = urlArray[urlArray.length-2];
    if(structure.content == null)  // block when data is not loaded.
      return;
    var length = structure.content.length;
    for(var i=0; i<length; i++){
      if(segment == structure.content[i].main_item.path){
        return structure.content[i].sub_item;
      }
    }
  };

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

.controller('ContentCtrl', ['$scope', '$location', 'structure', function($scope, $location, structure) {
  $scope.structure = structure;
  $scope.thisCotentPath = function() {
    var urlArray = $location.absUrl().split("/");
    var segment = urlArray[urlArray.length-2];
    //var segment = $location.hash();
    if(structure.content == null)  // block when data is not loaded.
      return;
    var length = structure.content.length;
    for(var i=0; i<length; i++){
      if(segment == structure.content[i].main_item.path){
        var path = structure.content[i].main_item.path;;
        return '../template/'+path+'.html';
      }
    }
  };
}])
