angular.module('Module.modeltable',['tools'])
.factory('modeltableservice',function($http) {
	var service = {};
	return service;
})
.controller("modeltablectrl",function($scope,modeltableservice){
	$scope.dataRows=[{courseName:"疯狂烧钱的教育O2O陷入窘境 破局之路在于后端驱动的B2C模式疯狂烧钱的教育O2O陷入窘境 破局之路在于后端驱动的B2C模式",activeState:2,publishState:"2",studyScore:50,modifyUserName:"aa"},
					 {courseName:"123",activeState:1,publishState:"1",studyScore:50,modifyUserName:"aa"},
					 {courseName:"疯狂烧钱的教育O2O陷入窘境 破局之路在于后端驱动的B2C模式疯狂烧钱的教育O2O陷入窘境 破局之路在于后端驱动的B2C模式",activeState:2,publishState:"2",studyScore:50,modifyUserName:"aa"},
					 {courseName:"疯狂烧钱的教育O2O陷入窘境 破局之路在于后端驱动的B2C模式疯狂烧钱的教育O2O陷入窘境 破局之路在于后端驱动的B2C模式",activeState:2,publishState:"2",studyScore:50,modifyUserName:"aa"}
					]
});