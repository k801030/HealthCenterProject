/**
 * Created by pilagod on 1/16/15.
 */
angular.module("pages", [])

.service('getSpreadSheetData', function($q) {
    var deferred = $q.defer();
    Tabletop.init({
        key: '1t5_YYxLzpunJ7gw_ghlubsnGtIw-b5Evh2MITmn67Wk',
        callback: function(data, tabletop) {
            for(var sheet_index in tabletop.sheets()){
                console.log(tabletop.sheets(sheet_index));
                for(var element_index in tabletop.sheets(sheet_index).elements){
                    if(tabletop.sheets(sheet_index).elements[element_index].content !== undefined)
                        tabletop.sheets(sheet_index).elements[element_index].content =
                            tabletop.sheets(sheet_index).elements[element_index].content.split('<br>');
                }
            }
            deferred.resolve(tabletop);
        }
    });
    return deferred.promise;
})

.service('scopeService', function() {
    return {
        safeApply: function ($scope, fn) {
            var phase = $scope.$root.$$phase;
            if (phase == '$apply' || phase == '$digest') {
                if (fn && typeof fn === 'function') {
                    fn();
                }
            } else {
                $scope.$apply(fn);
            }
        }
    };
})

.controller('reminder', ['$scope', function($scope){
    $('.wrap li').addClass("li_default");
    $('.wrap li>div[name="wrap_content"]').addClass("content_default");

    $('.wrap li').click(function(){
        if(!$(this).hasClass("li_on_target")){
            $(this).addClass("li_on_target");
            $(this).children("label:eq(0)").addClass("title_on_target");
            $(this).children("div[name='wrap_content']:eq(0)").addClass("content_on_target");
        }
        else{
            $(this).removeClass("li_on_target");
            $(this).children("label:eq(0)").removeClass("title_on_target");
            $(this).children("div[name='wrap_content']:eq(0)").removeClass("content_on_target");
        }
    });
}])

.controller('history', ['$scope', 'getSpreadSheetData', 'scopeService', function($scope, getSpreadSheetData, scopeService){
    getSpreadSheetData.then(function(tabletop){
        var history_data = tabletop.sheets('history');
        scopeService.safeApply($scope, function(){
                console.log(tabletop.sheets('history'));
                console.log(history_data.elements);
                $scope.header = history_data.elements[1];
                $scope.contents = history_data.elements.slice(2);
            }
        );

    });
//    $http.get('res/json/about_us/history.json').then(function(res){
//        console.log(res.data);
//        $scope.header = res.data.header;
//        $scope.contents = res.data.contents;
//    });

}])

.controller('feature', ['$scope', 'getSpreadSheetData', 'scopeService',function($scope, getSpreadSheetData, scopeService){
    getSpreadSheetData.then(function(tabletop){
        var feature_data = tabletop.sheets('feature');
        scopeService.safeApply($scope, function(){
                console.log(tabletop.sheets('feature'));
                console.log(feature_data.elements);
                $scope.header = feature_data.elements[1];
                $scope.contents = feature_data.elements.slice(2);
            }
        );
    });

}])

.controller('FQA', ['$scope', function($scope){
    $('.wrap li').addClass("li_default");
    $('.wrap li>div[name="wrap_content"]').addClass("content_default");

    $('.wrap li').click(function(){
        if(!$(this).hasClass("li_on_target")){
            $(this).addClass("li_on_target");
            $(this).children("label:eq(0)").addClass("title_on_target");
            $(this).children("div[name='wrap_content']:eq(0)").addClass("content_on_target");
        }
        else{
            $(this).removeClass("li_on_target");
            $(this).children("label:eq(0)").removeClass("title_on_target");
            $(this).children("div[name='wrap_content']:eq(0)").removeClass("content_on_target");
        }
    });
}])

.controller('government_employee', ['$scope', function($scope){
    $scope.tab_header_index = 1;
    $scope.tab_section_index = 1;

    setHeight($scope.tab_header_index, $scope.tab_section_index);
    $scope.setTabContentHeight = function(new_tab_section_index){
        setTabContentHeight($scope.tab_section_index, new_tab_section_index);
    };
    $scope.setTabHeaderHeight = function(new_tab_header_index){
        setTabHeaderHeight($scope.tab_header_index, new_tab_header_index);
    }
}])

.controller('functional', ['$scope', function($scope){
    $scope.tab_header_index = 1;
    $scope.tab_section_index = 1;

    setHeight($scope.tab_header_index, $scope.tab_section_index);
    $scope.setTabContentHeight = function(new_tab_section_index){
        setTabContentHeight($scope.tab_section_index, new_tab_section_index);
    };
    $scope.setTabHeaderHeight = function(new_tab_header_index){
        setTabHeaderHeight($scope.tab_header_index, new_tab_header_index);
    }
}])

.controller('oneday', ['$scope', function($scope){
    $scope.tab_header_index = 0;
    $scope.tab_section_index = 1;

    setHeight($scope.tab_header_index, $scope.tab_section_index);
    $scope.setTabContentHeight = function(new_tab_section_index){
        setTabContentHeight($scope.tab_section_index, new_tab_section_index);
    };

    $scope.getExamContent = function(){
        return "res/pdf/one_day.htm";
    }
}]);


function setHeight(tab_header_index, tab_section_index){
    var div_tabs_height = $('div.row:eq(0)').height();

    var tab_header_height;
    if(tab_header_index == 0)
        tab_header_height = 0;
    else
        tab_header_height = $('div[name="tab_header_content"]:eq(' + (tab_header_index-1).toString() + ')').height();

    var tab_content_height = $('div[name="tab_section_content"]:eq(' + (tab_section_index-1).toString() + ')').height();
    $('#content .container').height(div_tabs_height + tab_header_height + tab_content_height);
}

function setTabContentHeight(cur_tab_section_index, new_tab_section_index){
    var new_tab_content_height = $('div[name="tab_section_content"]:eq(' + (new_tab_section_index-1).toString() + ')').height();
    var cur_tab_content_height = $('div[name="tab_section_content"]:eq(' + (cur_tab_section_index-1).toString() + ')').height();
    var cur_height = $('#content .container').height();

    $('#content .container').height(cur_height - cur_tab_content_height + new_tab_content_height);
}

function setTabHeaderHeight(cur_tab_header_index, new_tab_header_index){
    var new_tab_header_height = $('div[name="tab_header_content"]:eq(' + (new_tab_header_index-1).toString() + ')').height();
    var cur_tab_header_height = $('div[name="tab_header_content"]:eq(' + (cur_tab_header_index-1).toString() + ')').height();
    var cur_height = $('#content .container').height();

    $('#content .container').height(cur_height - cur_tab_header_height + new_tab_header_height);
}