angular.module('client', [])



.controller('ClientCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
  $rootScope.form = {};
  $rootScope.form['name'];
  $rootScope.form['exam_type'];
  $rootScope.form['exam_date'] = {};
  $rootScope.form['gender'];
  $rootScope.form['idnum'];
  $rootScope.form['birth'] = {};
  $rootScope.form['phone'];
  $rootScope.form['email'];

  $scope.debug = function(){
    //console.log($rootScope.form);
    return $rootScope.form;
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


.controller('SubmitCtrl', ['$scope', '$rootScope', '$timeout' ,function($scope, $rootScope, $timeout){
  $scope.send_email = function() {
    if(checkValidate()==false){
      $('#form-error-msg').show();
      $timeout(function() {
        $('#form-error-msg').hide();
      }, 2500);
      return;
    }

    var mail = 'protein650224@gmail.com';
    subject = '馬偕健檢中心 — 線上預約';
    body = $rootScope.form;
    body = "預約人: " + $rootScope.form['name'] + "%0d%0a";
    
    body += "檢查類型\n: " + $rootScope.form['exam_type'] + "%0d%0a";
    body += "預定檢查日期: " + $rootScope.form['exam_date']['year'] +'/'+ $rootScope.form['exam_date']['month'] +'/'+ $rootScope.form['exam_date']['day'] + "%0d%0a"; 
    
    body += "性別: " + $rootScope.form['gender'] + "%0d%0a"; 
    body += "身分證字號: " + $rootScope.form['idnum'] + "%0d%0a"; 
    body += "生日: " + $rootScope.form['birth']['year'] +'/'+ $rootScope.form['birth']['month'] +'/'+ $rootScope.form['birth']['day'] +"%0d%0a"; 

    body += "電話: " + $rootScope.form['phone'] + "%0d%0a"; 
    body += "電子信箱: " + $rootScope.form['email'] + "%0d%0a"; 
    
    var href = 'mailto:'+mail+'?subject='+subject+'&body='+body;
    window.location.href = href;
  }
  
  function checkValidate() {
    if( $rootScope.form['name'] == null || $rootScope.form['exam_type'] == null || $rootScope.form['exam_date']['year'] == null || $rootScope.form['exam_date']['month'] == null || $rootScope.form['exam_date']['day'] == null || $rootScope.form['gender'] == null || $rootScope.form['idnum'] == null || $rootScope.form['birth']['year'] == null || $rootScope.form['birth']['month'] == null || $rootScope.form['birth']['day'] == null || $rootScope.form['phone'] == null || $rootScope.form['email'] == null )
      return false;
    else
      return true;
  }
}])

