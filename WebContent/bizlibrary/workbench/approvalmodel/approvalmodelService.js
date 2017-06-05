var app = angular.module('Module.approvalmodel', ['ngSanitize','ngTasty','ui.bootstrap','tools'])
/*
 *翻页插件需要依赖ngTasty
 * */
app.factory('approvalmodelService',function($http,$uibModal,$log) {
	var service = {};
	var CONTROLLER_URL = "./workbench/approvalmodel";
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
				"sort-by" : "status",
				"sort-order" : "asc",
				'rows' : response.data.data.resultList,
				'pagination' : response.data.data.pagination
			}
		});
	};
	return service;
});






