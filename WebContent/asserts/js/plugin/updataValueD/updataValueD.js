angular.module("updataValueD", [])
.directive("updataValue",function () {
	return {
		restrict:'AE',
		scope:{
			modelStr:'=',
			modelId:"=",
			modelRow:"=",
			getUpData:'&'
		},
		link:function(scope,element,attrs,parent){
			scope.inputStart=false;
			scope.showInput=function(){
				scope.inputStart=true;
			}
			scope.inputBlur=function(e,oldval,modelId){
				var newval=e.target.value;
				scope.getUpData({
					"id":modelId,
					"oldval":oldval,
					"newval":newval,
					"row":scope.modelRow
				});
				scope.inputStart=false;
			}
		},
		template:'<div><span ng-click="showInput()">{{modelStr}}</span><input ng-blur="inputBlur($event,modelStr,modelId)" ng-show="inputStart" type="text" ng-value="modelStr" class="form-control"/></div>',
		replace:true
	}
})
.directive("upviewValue",function () {
	return {
		restrict:'AE',
		scope:{
			modelStr:'=',
		},
		link:function(scope,element,attrs,parent){
			scope.inputStart=false;
			scope.showInput=function(){
				scope.inputStart=true;
			}
			scope.inputBlur=function(e,oldval,modelId){
				scope.modelStr=e.target.value;
				scope.inputStart=false;
			}
		},
		template:'<div><span ng-click="showInput()">{{modelStr}}</span><input ng-blur="inputBlur($event,modelStr)" ng-show="inputStart" type="text" ng-value="modelStr" class="form-control"/></div>',
		replace:true
	}
})