app.controller('texteditctrl',function($scope,texteditservice,$timeout) {
  
	$scope.courseContent = {"contentStr":"12313131"};
	$scope.cons=function(){
  	console.log($scope.courseContent.contentStr);
  }
});
