app.controller('checkctrl',function($scope,checkservice) {
  $scope.show=false;
  $scope.clickShow=function(){
  	$scope.show=true;
  }
  $scope.demoArray=[
  {name:"123",time:"123","start":false},
  {name:"1234",time:"1234","start":false}
  ]
});
