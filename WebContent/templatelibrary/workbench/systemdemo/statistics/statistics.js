angular.module('Module.statistics',['ngEchart'])
.factory('statisticsservice',function($http) {
	var service = {};
	return service;
})
.controller("statisticsctrl",function($scope,statisticsservice){
	$scope.count=0;
	$scope.add=function(){
		if($scope.count>3){$scope.count=0;$scope.option.data=[80, 56, 20, 24, 39, 33, 20, 10 , 5 , 20]}; 
		$scope.count++;
	}
	$scope.option={};
	$scope.option.Xdata=['A', 'B', 'C', 'D', 'E', 'F', 'G', "H", "i", "K"];
	$scope.option.data=[10, 52, 20, 34, 39, 33, 2, 10 , 55 , 60];
	$scope.option.color=['#3398DB'];
	
})