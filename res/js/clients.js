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

.controller('ReservDateCtrl', ['$scope', function($scope) {
  var date = new Date();
  var now = {
    year: date.getFullYear(),
    month: date.getMonth()+1,
    day: date.getDate()
  }
  $scope.getMinDate = function(_m, _d) { // minimum months/days could be reservation in advance.
    var y = now.year;
    var m = now.month + _m;
    var d = now.day + _d;

    convertTo2Digit(m);
    convertTo2Digit(d);
    // format: yyyy-mm-dd
    var output = y+'-'+convertTo2Digit(m)+'-'+convertTo2Digit(d);
    return output;
  };

  $scope.getMaxDate = function(_m, _d) { // maximum months/days could be reservation in advance.
    var y = now.year;
    var m = now.month + _m;
    var d = now.day + _d;
    // format: yyyy-mm-dd
    var output = y+'-'+convertTo2Digit(m)+'-'+convertTo2Digit(d);
    return output;
  };

  function convertTo2Digit(n){
    return n>9 ? ""+n : "0"+n;
  }

}])

.controller('VaildDateCtrl', ['$scope', function($scope) {
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