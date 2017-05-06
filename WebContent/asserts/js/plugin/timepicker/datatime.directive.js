'use strict';

angular.module('datatime.directive', [])
    .directive('ngTime', function() {
    return {
        restrict : 'A',
        require : '?ngModel',
        link : function($scope, $element, $attrs, $ngModel) {
			var startV=$attrs.startView?$attrs.startView:3;
			var minV=$attrs.min?$attrs.min:2;
			var maxV=$attrs.max?$attrs.max:3;	
            if (!$ngModel) {
                return;
            }
            $('.form_datetime').datetimepicker({
                weekStart: 1,
                todayBtn:  true,
                autoclose: 1,
                todayHighlight: 1,
                forceParse: 0,
                showMeridian: 1,
                startView: startV,
            	minView: minV,
            	maxView:maxV
            });
            if($attrs.startDate){
            	$('.form_datetime').datetimepicker("setStartDate",$attrs.startDate);
            }
            if($attrs.endDate){
            	$('.form_datetime').datetimepicker("setEndDate",$attrs.endDate);
            }
        }
    };
});