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
}]);