/**
 * Created by pilagod on 1/16/15.
 */
angular.module("pages", [])

.service('getSpreadSheetData', function($q) {
    var deferred = $q.defer();
    Tabletop.init({
        key: '1t5_YYxLzpunJ7gw_ghlubsnGtIw-b5Evh2MITmn67Wk',
        callback: function(data, tabletop) {
            var sheet;

            for(var sheet_index in tabletop.sheets()){
                //console.log(tabletop.sheets(sheet_index));

                sheet = tabletop.sheets(sheet_index);

                if(sheet_index == 'introduction_history' || sheet_index == 'introduction_feature' || sheet_index == 'introduction_environment' ||
                   sheet_index == 'cast_equipment' || sheet_index == 'cast_team'){
                    for(var element_index in sheet.elements.slice(1)){
                        element_index = parseInt(element_index) + 1;
                        if(sheet.elements[element_index].content !== "")
                            sheet.elements[element_index].content =
                                sheet.elements[element_index].content.split('\n');
                    }
                }
                else if(sheet_index == 'cast_dr'){
                    for(var element_index in sheet.elements.slice(1)){
                        element_index = parseInt(element_index) + 1;

                        sheet.elements[element_index].title =
                            sheet.elements[element_index].title.split('\n');

                        sheet.elements[element_index].education =
                            sheet.elements[element_index].education.split('\n');

                        sheet.elements[element_index].now_at =
                            sheet.elements[element_index].now_at.split('\n');

                        sheet.elements[element_index].experience =
                            sheet.elements[element_index].experience.split('\n');

                        sheet.elements[element_index].specialist =
                            sheet.elements[element_index].specialist.split('\n');

                    }
                }
                else if(sheet_index == 'item_oneday' || sheet_index == 'item_work' || sheet_index == 'item_government' ||
                        sheet_index == 'item_foreign' || sheet_index == 'item_adult' || sheet_index == 'item_event'){
                    for(var element_index in sheet.elements.slice(2)){
                        element_index = parseInt(element_index) + 2;
                        for(var i = 1; i <= 20; i++){
                            if(sheet.elements[element_index]["content" + i] !== ''){
                                sheet.elements[element_index]["content" + i] =
                                    sheet.elements[element_index]["content" + i].split('\n');
                            }
                        }
                        if(sheet.elements[element_index].content !== ''){
                            sheet.elements[element_index].content =
                                sheet.elements[element_index].content.split('\n');
                        }
                    }
                    //console.log(tabletop.sheets(sheet_index));
                }
                else if(sheet_index == 'health_know_healthcare' || sheet_index == 'health_info_disease' || sheet_index == 'health_info_QA' ||
                        sheet_index == 'health_info_nutrition' || sheet_index == 'health_info_nursing' || sheet_index == 'health_info_news'){
                    for(var element_index in sheet.elements.slice(2)){
                        element_index = parseInt(element_index) + 2;
                        for(var i = 1; i <= 20; i++){
                            if(sheet.elements[element_index]["content" + i] !== '') {
                                sheet.elements[element_index]["content" + i] =
                                    sheet.elements[element_index]["content" + i].split('\n');
                            }
                        }
                        if(sheet.elements[element_index].content !== '') {
                            sheet.elements[element_index].content =
                                sheet.elements[element_index].content.split('\n');
                        }
                        if(sheet.elements[element_index].footer !== '') {
                            sheet.elements[element_index].footer =
                                sheet.elements[element_index].footer.split('\n');
                        }
                    }
                }
            }
            deferred.resolve(tabletop);
        }
    });
    return deferred.promise;
})

//.service('getHomeSpreadSheetData', ['$q', 'getSpreadSheetData', function($q, getSpreadSheetData) {
//
//    var deferred = $q.defer();
//    getSpreadSheetData.then(function(tabletop){
//        var data = [];
//        data.push(tabletop.sheets('home_slider'));
//        data.push(tabletop.sheets('home_info'));
//
//
//
//        deferred.resolve(data);
//    });
//    return deferred.promise;
//}])

//.service('getIntroductionSpreadSheetData', ['$q', 'getSpreadSheetData', function($q, getSpreadSheetData) {
//
//    var deferred = $q.defer();
//    getSpreadSheetData.then(function(tabletop){
//        var data = [];
//        data.push(tabletop.sheets('introduction_history'));
//        data.push(tabletop.sheets('introduction_feature'));
//        data.push(tabletop.sheets('introduction_environment'));
//
//        for(var index in data) {
//            console.log(index);
////            if (sheet.elements[element_index].content !== "") {
////                sheet.elements[element_index].content =
////                    sheet.elements[element_index].content.split('\n');
////            }
//        }
//        deferred.resolve(data);
//    });
//    return deferred.promise;
//}])

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

.filter('range', function() {
    return function(input, total) {
        total = parseInt(total);
        for (var i=0; i<total; i++)
            input.push(i);
        return input;
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
        var history_data = tabletop.sheets('introduction_history');
        scopeService.safeApply($scope, function(){
                //console.log(tabletop.sheets('introduction_history'));
                //console.log(history_data.elements);
                $scope.header = history_data.elements[1];
                $scope.contents = history_data.elements.slice(2);
            }
        );
    });
}])

.controller('feature', ['$scope', 'getSpreadSheetData', 'scopeService',function($scope, getSpreadSheetData, scopeService){
    getSpreadSheetData.then(function(tabletop){
        var feature_data = tabletop.sheets('introduction_feature');
        scopeService.safeApply($scope, function(){
                //console.log(tabletop.sheets('introduction_feature'));
                //console.log(feature_data.elements);
                $scope.header = feature_data.elements[1];
                $scope.contents = feature_data.elements.slice(2);
            }
        );
    });

}])

.controller('environment', ['$scope', 'getSpreadSheetData', 'scopeService',function($scope, getSpreadSheetData, scopeService){
    getSpreadSheetData.then(function(tabletop){
        var environment_data = tabletop.sheets('introduction_environment');
        scopeService.safeApply($scope, function(){
                //console.log(tabletop.sheets('introduction_feature'));
                //console.log(feature_data.elements);
                $scope.header = environment_data.elements[1];
                $scope.contents = environment_data.elements.slice(2);
            }
        );
    });
}])

.controller('government_employee', ['$scope', 'getSpreadSheetData', 'scopeService', function($scope, getSpreadSheetData, scopeService) {
//    $scope.tab_header_index = 0;
    $scope.tab_section_index = 1;

//    setHeight($scope.tab_header_index, $scope.tab_section_index);
//    $scope.setTabContentHeight = function(new_tab_section_index){
//        setTabContentHeight($scope.tab_section_index, new_tab_section_index);
//    };
//    $scope.setTabHeaderHeight = function(new_tab_header_index){
//        setTabHeaderHeight($scope.tab_header_index, new_tab_header_index);
//    }

    $scope.changeContent = function(index) {
        if(index == 1){
            $('#item_href').attr('href', 'https://docs.google.com/spreadsheets/d/1SmWi3wuZVPd-9FoZwtZOnAXXwbSWl_ur-xLc5MYfC7g/pubhtml?widget=true&amp;headers=false');
            $('#item_frame').attr('src', 'https://docs.google.com/spreadsheets/d/1SmWi3wuZVPd-9FoZwtZOnAXXwbSWl_ur-xLc5MYfC7g/pubhtml?widget=true&amp;headers=false');
        }
        if(index == 2){
            $('#item_href').attr('href', 'https://docs.google.com/spreadsheets/d/1nO3aocwPG6zdgHwt8UpSmKD4J_-WbAhCUEa3pbh2Q4o/pubhtml?widget=true&amp;headers=false');
            $('#item_frame').attr('src', 'https://docs.google.com/spreadsheets/d/1nO3aocwPG6zdgHwt8UpSmKD4J_-WbAhCUEa3pbh2Q4o/pubhtml?widget=true&amp;headers=false');
        }
    };

    getSpreadSheetData.then(function(tabletop){
        var item_government_data = tabletop.sheets('item_government');
        scopeService.safeApply($scope, function(){
                //console.log(tabletop.sheets('item_government'));
                //console.log(item_government_data.elements);
                $scope.header = item_government_data.elements[1];
                $scope.contents = item_government_data.elements.slice(2);
            }
        );
    });
}])

.controller('functional', ['$scope', function($scope){
//    $scope.tab_header_index = 1;
//    $scope.tab_section_index = 1;
//
//    setHeight($scope.tab_header_index, $scope.tab_section_index);
//    $scope.setTabContentHeight = function(new_tab_section_index){
//        setTabContentHeight($scope.tab_section_index, new_tab_section_index);
//    };
//    $scope.setTabHeaderHeight = function(new_tab_header_index){
//        setTabHeaderHeight($scope.tab_header_index, new_tab_header_index);
//    }
}])

.controller('oneday', ['$scope', 'getSpreadSheetData', 'scopeService', function($scope, getSpreadSheetData, scopeService) {
//    $scope.tab_header_index = 0;
//    $scope.tab_section_index = 1;
//
//    setHeight($scope.tab_header_index, $scope.tab_section_index);
//    $scope.setTabContentHeight = function(new_tab_section_index){
//        setTabContentHeight($scope.tab_section_index, new_tab_section_index);
//    };

//    $scope.getExamContent = function(){
//        return "res/pdf/one_day.htm";
//    }

    getSpreadSheetData.then(function(tabletop){
        var item_oneday_data = tabletop.sheets('item_oneday');
        $scope.link = "";
        scopeService.safeApply($scope, function(){
//                console.log(tabletop.sheets('item_oneday'));
//                console.log(item_oneday_data.elements);
                $scope.header = item_oneday_data.elements[1];
                $scope.contents = item_oneday_data.elements.slice(2);
            }
        );
    });

}])

.controller('work', ['$scope', 'getSpreadSheetData', 'scopeService', function($scope, getSpreadSheetData, scopeService) {
//    $scope.tab_header_index = 0;
//    $scope.tab_section_index = 1;
//
//    setHeight($scope.tab_header_index, $scope.tab_section_index);
//    $scope.setTabContentHeight = function(new_tab_section_index){
//        setTabContentHeight($scope.tab_section_index, new_tab_section_index);
//    };

    getSpreadSheetData.then(function(tabletop){
        var work_data = tabletop.sheets('item_work');
        scopeService.safeApply($scope, function(){
                //console.log(tabletop.sheets('work'));
                //console.log(work_data.elements);
                $scope.header = work_data.elements[1];
                $scope.contents = work_data.elements.slice(2);
            }
        );
    });

}])

.controller('foreigner', ['$scope', 'getSpreadSheetData', 'scopeService', function($scope, getSpreadSheetData, scopeService) {
    getSpreadSheetData.then(function(tabletop){
        var item_foreign_data = tabletop.sheets('item_foreign');
        scopeService.safeApply($scope, function(){
                //console.log(tabletop.sheets('item_foreign'));
                //console.log(item_foreign_data.elements);
                $scope.header = item_foreign_data.elements[1];
                $scope.contents = item_foreign_data.elements.slice(2);
            }
        );
    });
}])

.controller('adult', ['$scope', 'getSpreadSheetData', 'scopeService', function($scope, getSpreadSheetData, scopeService) {
    getSpreadSheetData.then(function(tabletop){
        var item_adult_data = tabletop.sheets('item_adult');
        scopeService.safeApply($scope, function(){
                //console.log(tabletop.sheets('item_adult'));
                //console.log(item_adult_data.elements);
                $scope.header = item_adult_data.elements[1];
                $scope.contents = item_adult_data.elements.slice(2);
            }
        );
    });
}])


.controller('event', ['$scope', 'getSpreadSheetData', 'scopeService', function($scope, getSpreadSheetData, scopeService) {
    getSpreadSheetData.then(function(tabletop){
        var item_event_data = tabletop.sheets('item_event');
        scopeService.safeApply($scope, function(){
                //console.log(tabletop.sheets('item_adult'));
                //console.log(item_adult_data.elements);
                $scope.header = item_event_data.elements[1];
                $scope.contents = item_event_data.elements.slice(2);
            }
        );
    });
}])

.controller('equipment', ['$scope', 'getSpreadSheetData', 'scopeService', function($scope, getSpreadSheetData, scopeService){
    getSpreadSheetData.then(function(tabletop){
        var cast_equipment_data = tabletop.sheets('cast_equipment');
        scopeService.safeApply($scope, function(){
                //console.log(tabletop.sheets('introduction_history'));
                //console.log(history_data.elements);
                $scope.header = cast_equipment_data.elements[1];
                $scope.contents = cast_equipment_data.elements.slice(2);
            }
        );
    });
}])


.controller('team', ['$scope', 'getSpreadSheetData', 'scopeService', function($scope, getSpreadSheetData, scopeService){
    getSpreadSheetData.then(function(tabletop){
        var cast_team_data = tabletop.sheets('cast_team');
        scopeService.safeApply($scope, function(){
                //console.log(tabletop.sheets('introduction_history'));
                //console.log(history_data.elements);
                $scope.header = cast_team_data.elements[1];
                $scope.contents = cast_team_data.elements.slice(2);
            }
        );
    });
}])


.controller('dr', ['$scope', 'getSpreadSheetData', 'scopeService', function($scope, getSpreadSheetData, scopeService){
    getSpreadSheetData.then(function(tabletop){
        var dr_data = tabletop.sheets('cast_dr');
        scopeService.safeApply($scope, function(){
                //console.log(tabletop.sheets('cast_dr'));
                //console.log(dr_data.elements);
                $scope.header = dr_data.elements[1];
                $scope.contents = dr_data.elements.slice(2);
            }
        );
    });
}])

.controller('FQA', ['$scope', 'getSpreadSheetData', 'scopeService', function($scope, getSpreadSheetData, scopeService){
//    wrapSetting();
    getSpreadSheetData.then(function(tabletop){
        var health_info_QA_data = tabletop.sheets('health_info_QA');
        scopeService.safeApply($scope, function(){
                //console.log(tabletop.sheets('health_info_QA'));
                //console.log(health_info_QA_data.elements);
                $scope.header = health_info_QA_data.elements[1];
                $scope.contents = health_info_QA_data.elements.slice(2);
            }
        );
    });

    $scope.showContent = showContent;
}])

.controller('reminder', ['$scope', 'getSpreadSheetData', 'scopeService', function($scope, getSpreadSheetData, scopeService){
    getSpreadSheetData.then(function(tabletop){
        var health_know_data = tabletop.sheets('health_know_healthcare');
        scopeService.safeApply($scope, function(){
                //console.log(tabletop.sheets('health_know_healthcare'));
                //console.log(health_know_data.elements);
                $scope.header = health_know_data.elements[1];
                $scope.contents = health_know_data.elements.slice(2);
            }
        );
    });

    $scope.showContent = showContent;
}])

.controller('health_info', ['$scope', 'getSpreadSheetData', 'scopeService', function($scope, getSpreadSheetData, scopeService){
    getSpreadSheetData.then(function(tabletop){
        var health_info_data = tabletop.sheets('health_info_disease');
        scopeService.safeApply($scope, function(){
                //console.log(tabletop.sheets('health_info_disease'));
                //console.log(health_info_data.elements);
                $scope.header = health_info_data.elements[1];
                $scope.contents = health_info_data.elements.slice(2);
            }
        );
    });

    $scope.showContent = showContent;
}])

.controller('nutrition_consultation', ['$scope', 'getSpreadSheetData', 'scopeService', function($scope, getSpreadSheetData, scopeService){
    getSpreadSheetData.then(function(tabletop){
        var nutrition_consultation_data = tabletop.sheets('health_info_nutrition');
        scopeService.safeApply($scope, function(){
                //console.log(tabletop.sheets('health_info_disease'));
                //console.log(health_info_data.elements);
                $scope.header = nutrition_consultation_data.elements[1];
                $scope.contents = nutrition_consultation_data.elements.slice(2);
            }
        );
    });

    $scope.showContent = showContent;
}])


.controller('nursing_consultation', ['$scope', 'getSpreadSheetData', 'scopeService', function($scope, getSpreadSheetData, scopeService){
    getSpreadSheetData.then(function(tabletop){
        var nursing_consultation_data = tabletop.sheets('health_info_nursing');
        scopeService.safeApply($scope, function(){
                //console.log(tabletop.sheets('health_info_disease'));
                //console.log(health_info_data.elements);
                $scope.header = nursing_consultation_data.elements[1];
                $scope.contents = nursing_consultation_data.elements.slice(2);
            }
        );
    });

    $scope.showContent = showContent;
}])

.controller('medical_info', ['$scope', 'getSpreadSheetData', 'scopeService', function($scope, getSpreadSheetData, scopeService){
    getSpreadSheetData.then(function(tabletop){
        var medical_info_data = tabletop.sheets('health_info_news');
        scopeService.safeApply($scope, function(){
                //console.log(tabletop.sheets('health_info_disease'));
                //console.log(health_info_data.elements);
                $scope.header = medical_info_data.elements[1];
                $scope.contents = medical_info_data.elements.slice(2);
            }
        );
    });

    $scope.showContent = showContent;
}])




// Controller  for Carousel
//.controller('CarouselCtrl', ['$scope', 'getSpreadSheetData', 'scopeService', function($scope, getSpreadSheetData, scopeService) {
//// initializing the time Interval
//    $scope.myInterval = 5000;
//
//    getSpreadSheetData.then(function(tabletop){
//        var home_slider_data = tabletop.sheets('home_slider');
//        scopeService.safeApply($scope, function(){
//                console.log(tabletop.sheets('home_slider'));
//                console.log(home_slider_data.elements);
//                $scope.slides = home_slider_data.elements.slice(1);
//            }
//        );
//    });
//
////    // Initializing  slide rray
////    $scope.slides = [
////        {image:'res/images/sliders/1.jpg',title:'id1', text:'馬偕醫院淡水分區，期望帶給大家健康溫馨的生活。'},
////        {image:'res/images/sliders/2.jpg',title:'', text:'夏天、海洋。'},
////        {image:'res/images/sliders/3.jpg',title:'', text:'自然。'}];
//
////    var slides = $scope.slides;
//
//}])

.controller('home', ['$scope', 'getSpreadSheetData', 'scopeService', function($scope, getSpreadSheetData, scopeService) {
    $scope.myInterval = 5000;
    getSpreadSheetData.then(function(tabletop){
        var home_slider_data = tabletop.sheets('home_slider');
        var home_info_data = tabletop.sheets('home_info');
//        var home_slider_data = data[0]; //home_slider
//        var home_info_data = data[1]; //home_info
        scopeService.safeApply($scope, function(){
                //console.log(tabletop.sheets('home_slider'));
                //console.log(home_slider_data.elements);
                $scope.slides = home_slider_data.elements.slice(1);
                $scope.infos = home_info_data.elements.slice(1);
            }
        );
    });
}]);


//function setHeight(tab_header_index, tab_section_index){
//    var div_tabs_height = $('div.row:eq(0)').height();
//
//    var tab_header_height;
//    if(tab_header_index == 0)
//        tab_header_height = 0;
//    else
//        tab_header_height = $('div[name="tab_header_content"]:eq(' + (tab_header_index-1).toString() + ')').height();
//
//    var tab_content_height = $('div[name="tab_section_content"]:eq(' + (tab_section_index-1).toString() + ')').height();
//    $('#content .container').height(div_tabs_height + tab_header_height + tab_content_height);
//}
//
//function setTabContentHeight(cur_tab_section_index, new_tab_section_index){
//    var new_tab_content_height = $('div[name="tab_section_content"]:eq(' + (new_tab_section_index-1).toString() + ')').height();
//    var cur_tab_content_height = $('div[name="tab_section_content"]:eq(' + (cur_tab_section_index-1).toString() + ')').height();
//    var cur_height = $('#content .container-fluid').height();
//
//    $('#content .container-fluid').height(cur_height - cur_tab_content_height + new_tab_content_height);
//    alert($('#content .container-fluid').height());
//}
//
//function setTabHeaderHeight(cur_tab_header_index, new_tab_header_index){
//    var new_tab_header_height = $('div[name="tab_header_content"]:eq(' + (new_tab_header_index-1).toString() + ')').height();
//    var cur_tab_header_height = $('div[name="tab_header_content"]:eq(' + (cur_tab_header_index-1).toString() + ')').height();
//    var cur_height = $('#content .container').height();
//
//    $('#content .container').height(cur_height - cur_tab_header_height + new_tab_header_height);
//}
//
//function wrapSetting(){
//    $('.wrap li').addClass("li_default");
//    $('.wrap li>div[name="wrap_content"]').addClass("content_default");
//
//    $('.wrap li').click(function(){
//        if(!$(this).hasClass("li_on_target")){
//            $(this).addClass("li_on_target");
//            $(this).children("label:eq(0)").addClass("title_on_target");
//            $(this).children("div[name='wrap_content']:eq(0)").addClass("content_on_target");
//        }
//        else{
//            $(this).removeClass("li_on_target");
//            $(this).children("label:eq(0)").removeClass("title_on_target");
//            $(this).children("div[name='wrap_content']:eq(0)").removeClass("content_on_target");
//        }
//    });
//}

function showContent(e){
    var $this = $(e.currentTarget);
    if(!$this.hasClass("li_on_target")){
        $this.addClass("li_on_target");
        $this.children("label:eq(0)").addClass("title_on_target");
        $this.children("div[name='wrap_content']:eq(0)").addClass("content_on_target");
    }
    else{
        $this.removeClass("li_on_target");
        $this.children("label:eq(0)").removeClass("title_on_target");
        $this.children("div[name='wrap_content']:eq(0)").removeClass("content_on_target");
    }
}