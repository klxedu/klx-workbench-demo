angular.module("copyobj", [])
.directive("addArrayObj",function () {
	return {
		restrict:'AE',
		scope:{
			arr:"="
		},
		template:'<span class="btn btn-default" ng-click="add()"><span class="glyphicon glyphicon-plus"></span > 新增</span>',
		link:function(scope,element,attrs,parent){
			scope.add=function(){

				if (Object.prototype.toString.call(scope.arr) === '[object Array]'&&scope.arr.length>0&&Object.prototype.toString.call(scope.arr[0])!=="[object Number]") {
					var copyArray={};
					$.extend(true, copyArray, scope.arr[0]);
					$.each(copyArray, function(index) {
					    copyArray[index]="";
					});
					scope.arr.push(copyArray);
			  } else{
				  console.error("当前对象不是一个数组或当前数组为空",scope.arr);
			  }
			}
		},
		replace:false
	}
})
var app = angular.module('Module.check', ['daterangepicker','updataValueD'])
app.factory('checkservice',function($http) {
	var service = {};

	return service;
});
