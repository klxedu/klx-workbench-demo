app.controller('approvalmodelctrl', function($scope, approvalmodelService,$timeout) {
	
	$scope.tfootState = false;
	$scope.tableInit = function(params,paramsObj){
		return approvalmodelService.findList(params,paramsObj);
	}
});

