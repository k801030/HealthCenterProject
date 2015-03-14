angular.module('client', [])

.factory('isSurvey', function($location, $anchorScroll){
  var data = {
    status: true
  };
  return {
    getStatus: function(){
      return data.status;
    },
    leave: function(){
      data.status = false;
    }
  };
})

.controller('SurveyCtrl', ['$scope', 'isSurvey', function($scope, isSurvey){
  $scope.isSurveyStatus = function() {
    return isSurvey.getStatus();
  }
  $scope.isSurveySwitch = function(){
    isSurvey.leave();
  }
  $scope.surveyItems = [
    { name: '您是否抽菸', type: 1, selected: false},
    { name: '您一周的運動是否小於兩次', type: 1, selected: false},
    { name: '您是否常會突然覺得喘不過氣來，好像缺氧一樣', type: 1, selected: false},
    { name: '您是否有時會有心悸的症狀，以前並不會', type: 1, selected: false},
    { name: '您是否有時覺得胸口好像被勒緊般地疼痛,疼痛是否會反射至其它部位', type: 1, selected: false},
    { name: '您的工作時數是否超過十小時或需經常加班', type: 1, selected: false},
    { name: '您是否有服用高血壓藥物', type: 1, selected: false},
    { name: '您是否有糖尿病病史', type: 1, selected: false},
    { name: '您是否有心血管疾病病史', type: 1, selected: false},
    { name: '您是否有有左心室肥大病史', type: 1, selected: false},

    { name: '您近三個月內體重是否有明顯增減', type: 2, selected: false},
    { name: '您是否經常外食', type: 2, selected: false},
    { name: '您是否有飲食習慣改變', type: 2, selected: false},
    { name: '您是否有盜汗情形發生', type: 2, selected: false},
    { name: '您是否有不明原因咳嗽', type: 2, selected: false},
    { name: '您是否有胸口灼熱感', type: 2, selected: false},
    { name: '您是否經常感到腹脹', type: 2, selected: false},
    { name: '您是否經常感到腹痛', type: 2, selected: false},
    { name: '您是否有解血便情形', type: 2, selected: false},
    { name: '您是否經常有噁心感', type: 2, selected: false},
    { name: '您近三個月是否有排便習慣改變', type: 2, selected: false},
    { name: '您是否有背部痠痛情形發生', type: 2, selected: false},
    { name: '您是否易有焦慮狀況發生', type: 2, selected: false},
    { name: '您是否一天會吃3碗青菜', type: 2, selected: false},
    { name: '您是否每天會吃到2份以上的水果 (如：1顆小蘋果為1份)', type: 2, selected: false},
    { name: '一週會有3天以上常吃油炸或加工食物', type: 2, selected: false},
    { name: '您近三個月排便習慣是否改變', type: 2, selected: false},

    { name: '您是否有腹部脂肪堆積情況', type: 3, selected: false},
    { name: '您是否有糖尿病、心臟病、高血壓及肥胖家族史', type: 3, selected: false},
    { name: '您的體重是否有超過標準體重10公斤', type: 3, selected: false},
    { name: '您是否喜歡攝取澱粉類食物', type: 3, selected: false},
    { name: '您的腰圍是否大於(男性90公分女性80公分)', type: 3, selected: false},
    { name: '您的高密度膽固醇是否低於(男性40mg/dl女性50mg/dl)', type: 3, selected: false},
    { name: '您的三酸甘油脂是否大於150mg/dl', type: 3, selected: false},
    { name: '您的血壓是否大於130/85mmHg', type: 3, selected: false},
    { name: '您的血糖是否大於110 mg/dl', type: 3, selected: false},

    { name: '您最近是否常常失眠或睡眠品質不佳？', type: 4, selected: false},
    { name: '您最近是否經常有情緒低落、焦慮、煩躁的情況？', type: 4, selected: false},
    { name: '您最近是否注意力經常難以集中？', type: 4, selected: false},
    { name: '您最近是否經常忘東忘西、變得很健忘？', type: 4, selected: false},
    { name: '您最近是否經常覺得胃口不好或有胃部不適情形？', type: 4, selected: false},
    { name: '您最近是否覺得工作總是做不完？', type: 4, selected: false},
    { name: '您最近是否經常覺得頭痛、腰痠背痛？', type: 4, selected: false},
    { name: '您最近是否經常覺得很累？', type: 4, selected: false},
    { name: '您最近六個月內是否生病不只一次了？', type: 4, selected: false}
  ];
  
  $scope.result = function(){
    types = [];
    for(var i=1; i<5; i++)
      types[i] = 0;
    items = $scope.surveyItems;
    for (var i=0; i<items.length; i++){
      if(items[i].selected == true){
        types[items[i].type] += 1;
      }
    }
    max = 0;
    for (var i=1; i< 5; i++){
      console.log(types);
      if(types[i] > types[max]){
        console.log(i);
        max = i;
      }
    }

    if(max == 1){
      $scope.resultMsg = "心血管健檢";
    }else if(max == 2){
      $scope.resultMsg = "無痛腸胃鏡";
    }else if(max == 3){
      $scope.resultMsg = "精緻套組";
    }else if(max == 4){
      $scope.resultMsg = "腦部MRI";
    }
    $('#form-result-msg').show();
  };

  $scope.resultMsg;

}])

.controller('ClientCtrl', ['$scope', '$rootScope', 'isSurvey', function($scope, $rootScope, isSurvey) {
  $scope.isSurveyStatus = function() {
    return isSurvey.getStatus();
  }
  $scope.isSurveySwitch = function(){
    isSurvey.leave();
  }
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

