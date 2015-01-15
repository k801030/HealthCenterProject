angular.module('client', [])



.controller('ClientCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
  $rootScope.form = {};
  $rootScope.form['name'];
  $rootScope.form['exam_type'];
  $rootScope.form['exam_date'];
  $rootScope.form['gender'];
  $rootScope.form['idnum'];
  $rootScope.form['birth'];
  $rootScope.form['email'];

  $scope.debug = function(){
    console.log($rootScope.form);
  }
}])

.controller('DateCtrl', ['$scope', function($scope) {
  $scope.years = getYear();
  $scope.months = getMonth();
  $scope.days = function() {
    var _days = 31;
    var array = [];
    switch($scope.birth.month){
      case 4:
      case 6:
      case 9:
      case 11:
        _days = 30;
        break;
      case 2:
        _days = 28;
        break;
      default:
        _days = 31;
        break;
    }
    if($scope.birth.year%4 == 0 && $scope.birth.month == 2)
      _days = 29;

    for(var i=1; i<=_days; i++){
      array.push(i);
    }
    return array;
  };

  $scope.birth = {
    year: '',
    month: '',
    day: ''
  }

  function getYear() {
    var array = [];
    for(var i=2015; i>=1900; i--)
      array.push(i);
    return array;
  }
  function getMonth() {
    var array = [];
    for(var i=1; i<=12; i++)
      array.push(i);
    return array;
  }

}])