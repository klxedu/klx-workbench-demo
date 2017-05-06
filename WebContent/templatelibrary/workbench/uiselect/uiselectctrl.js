app.controller('uiselectctrl',function($scope,uiselectservice) {
	
	$scope.url="./workbench/uiselect/selectdata.json";
	$scope.a=null;
	
    $scope.d=function(){
    	$scope.a={ "$selected": { "id": 31, "title": "Blogtag", "size": "97084", "parent": false } } ;
    	console.log($scope.a);
    }
});
