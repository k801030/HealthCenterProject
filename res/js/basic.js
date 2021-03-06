angular.module("basic", ['ui.bootstrap'])

// make hash # available
.config(function($locationProvider) {
  $locationProvider.html5Mode(false); 
})

// executed just after configuration. 
.run(function($rootScope) {
  $rootScope.navUrl = 'template/nav.html';
  $rootScope.footerUrl = 'template/footer.html';
})

// for passing value between pages
.factory('tab', function() {
  var tabSelected;
  
  function set(num) {
    tabSelected = num;
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
  $http.get('res/json/structure.txt').then(function(res){
    _data.content = res.data;
  });
  return _data ;
}])

.controller('NavCtrl', ['$scope', '$location', 'structure', 'tab', function($scope, $location, structure, tab) {
  $scope.structure = structure;
  $scope.setTab = function(num) {
    tab.set(num);
  }
  $scope.getTab = function() {
    return tab.get();
  }
  $scope.isActive = function () {
    // get the last part of url 
    // and return true/false 
    var urlArray = $location.absUrl().split("/");
    var segment = urlArray[urlArray.length-1]; 
    //var segment = $location.hash();
    return this.item.main_item.path == segment;
  };
  $scope.location = $location.path();


}])

.controller('SideBarCtrl', ['$scope', '$location', 'structure', 'tab', function($scope, $location, structure, tab) {
  $scope.init = function() { // init if tab is undefined.
    if(tab.get()==null)
      tab.set(0);
  }
  $scope.setTab = function(num) {
    tab.set(num);
  }
  $scope.getTab = function() {
    return tab.get();
  }
  $scope.thisHash = function(){
    var urlArray = $location.absUrl().split("/");
    var segment = urlArray[urlArray.length-1]; 
    return segment;
  }
  $scope.thisContent = function() {
    var urlArray = $location.absUrl().split("/");
    var segment = urlArray[urlArray.length-1]; 
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

.controller('DropdownCtrl', ['$scope', '$timeout', function($scope, $timeout) {

  $scope.toggled = function(open) {
    //$log.log('Dropdown is now: ', open);
  };

  $scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
  };

  $scope.delayClose = function(_this) {

    $timeout(function() {
      _this.status.isopen = false;
    },150);
  }
  $scope.timeout = function(callback){
  }

}])

.controller('ContentCtrl', ['$scope', '$location', 'structure', function($scope, $location, structure) {
  $scope.structure = structure;
  $scope.thisHash = function(){
    var urlArray = $location.absUrl().split("/");
    var segment = urlArray[urlArray.length-1]; 
    return segment;
  }
  $scope.thisContentPath = function() {

    var urlArray = $location.absUrl().split("/");
    //var segment = urlArray[urlArray.length-2];
    var urlArray = $location.absUrl().split("/");
    var segment = urlArray[urlArray.length-1]; 
    
    if(structure.content == null)  // block when data is not loaded.
      return;

    if(segment == "" || segment == "home"){
      return 'template/home.html';
    }else if (segment == "clients" || segment == "contact_us" || segment== "transportation"){
      return 'template/blank_page.html';
    }else {
      return 'template/tab_page.html';
    }
    
  };
}])

.controller('mainPhotoCtrl', ['$scope', '$location', 'structure', function($scope, $location, structure) {
  $scope.imgUrl = function() {
    var url = "res/images/main_photo/" + $location.hash() + '.jpg';
    return url;
  }
}])