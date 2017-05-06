app.controller('summernotectrl',function($scope,summernoteservice) {
  
	$scope.courseContent = {"contentStr":"12313131"};
	$scope.cons=function(){
  	console.log($scope.courseContent.contentStr);
  }
});
