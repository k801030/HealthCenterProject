/**
 * Created by pilagod on 1/16/15.
 */
angular.module("pages", [])

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