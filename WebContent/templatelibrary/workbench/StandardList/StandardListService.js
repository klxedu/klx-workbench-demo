var app = angular.module('Module.StandardList', ['daterangepicker', 'ngSanitize','datatime.directive','ngTasty','ngAnimate','ui.bootstrap','tools'])

/*
 *翻页插件需要依赖ngTasty
 * */
app.factory('StandardListService',function($http,$uibModal,$log) {
	var service = {};
	var CONTROLLER_URL = "workbench/StandardList";
	service.findList = function(params, paramsObj) {
		var url = CONTROLLER_URL + "/mockdata.json";
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
	return service;
});






