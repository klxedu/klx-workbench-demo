app.controller('uitabctrl', function($scope, uitabservice) {
	$scope.tabContrl = {
			"showBtn":true,
			"tabsHeaderSwitch":true
			
	};
	$scope.preTab = function(){
		$scope.tabContrl.preTab();
	}
	$scope.nextTab = function(){
		$scope.tabContrl.nextTab();
	}
});