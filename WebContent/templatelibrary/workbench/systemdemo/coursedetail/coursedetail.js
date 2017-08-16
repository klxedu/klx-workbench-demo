angular.module('Module.coursedetail',['ngEchart'])
.factory('coursedetailservice',function($http) {
	var service = {};
	return service;
})
.controller("coursedetailctrl",function($scope,coursedetailservice){
	$scope.option={};
	$scope.option.data=[
        {value:335, name:'A'},
        {value:310, name:'B'},
        {value:234, name:'C'},
        {value:135, name:'D'},
        {value:1548, name:'E'}
    ];
    $scope.events=function(eobj){
		console.log(eobj);
    }
})