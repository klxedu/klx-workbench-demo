angular.module('Module.sysrefresh',[]).controller("sysrefreshctrl",function($scope,$http,$window){
	$scope.doRefresh = function(){
		$http({
			method : "get",
			url    : "./workbench/sysrefresh/response.json"
		})
		.success(function(data){
			console.log("response success,reload start");
			$window.location.reload();
//			$window.location.href="http://localhost/klx-workbench-demo/templatelibrary/index.html";
		});
	}
});