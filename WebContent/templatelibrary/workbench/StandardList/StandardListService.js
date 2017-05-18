var app = angular.module('Module.StandardList', ['daterangepicker', 'ngSanitize','datatime.directive','ngTasty','ngAnimate','ui.bootstrap','tools'])

/*
 *翻页插件需要依赖ngTasty
 * */
app.factory('StandardListService',function($http,$uibModal,$log) {
	var service = {};
	var CONTROLLER_URL = "../workbench/swbuser";
	service.findList = function(params, paramsObj) {
		var url = CONTROLLER_URL + "/queryUserList.json";
		return $http.get(url + "?" + params).then(function(response) {
			return {
				'header' : [ {
					"key" : "accountID",
					"name" : "选择",
					"style" : {
						'width' : '5%'
					}
				}, {
					"key" : "loginID",
					"name" : "登录名"
				}, {
					"key" : "status",
					"name" : "状态"
				} ],
				'rows' : response.data.data.resultList,
				'pagination' : response.data.data.pagination,
				"sort-by" : "status",
				"sort-order" : "asc"
			}
		});
	};
	service.dataGrid=function(griddata){
		return $http({
			method : "get",
			url    : "./worbench/StandardList/response.json"
		})
		.success(function(data){
			griddata=data.data.resultList;
		})
	};
	service.showuserdialog = function(size,items){
		var modalInstance = $uibModal.open({
		      animation: true,
		      templateUrl: './worbench/StandardList/myModalContent.html',
		      controller: 'ModalInstanceCtrl',
		      size: size,
		      resolve: {
		        items: function () {
		        	return items;
		        }
		      }
		    });
		return modalInstance;
	}
	service.dataGrid = function(params, paramsObj) {
		var url = "./worbench/StandardList/response.json";
		return $http
			.get(url + "?" + params)
			.then(
					function(response) {
						return {
							'header' :[{
									"key" : "courseId",
									"name" : "选择"
								}, {
									"key" : "courseName",
									"name" : "课程信息"
								}
							],
							'rows' : response.data.data.resultList,
							'pagination' : response.data.data.pagination,
							"sort-by" : "activeState",
							"sort-order" : "asc"
						}
					});
	};
	return service;
});

app.controller('ModalInstanceCtrl', function ($scope,$uibModalInstance,items,StandardListService,selectDialogFactory) {

	$scope.init = {'sortBy' : 'status','sortOrder' : 'desc'}; // 排序
	$scope.getuserdata = function(params, paramsObj) {
		params+="&queryActiveState=1&queryUserName=";
		return StandardListService.findList(params, paramsObj);
	}
	$scope.reloadUserdata=function(){}
    // init dialog item
	selectDialogFactory.initSelectDialog($scope,$uibModalInstance,items);

});






