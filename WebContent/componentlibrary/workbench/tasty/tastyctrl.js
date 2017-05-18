app.controller('tastyctrl',function($scope,$http,tastyctrlservice) {
	$scope.dataGrid=function(params,paramsObj){
		//重置全选
		//$scope.tableState.selectAll = false;
		$scope.ckListStr = '';
		return tastyctrlservice.dataGrid(params,paramsObj);
	}
});
