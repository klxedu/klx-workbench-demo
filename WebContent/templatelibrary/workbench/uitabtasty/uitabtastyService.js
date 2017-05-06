
var app = angular.module('Module.uitabtasty',['ngTasty','gtilesTasty']);
app.factory('uitabtastyService',function($http){
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
	
	service.getRole = function(params, paramsObj){
		return $http.get("../workbench/gtauth/findRoleListByPage.json?"+params).then(function (response) {
		    return {
		      'header':  [
		                  {   "key": "roleId",
		                      "name": "序号",
		                      "style": {'width':'5%'}
		                    },
		                    {
		                      "key": "roleName",
		                      "name": "角色名称"
		                    },
		                    {
		                    	"key": "roleCode",
			                    "name": "角色编码"
		                    },
		                    {  "key": "roleType",
			                   "name": "角色类型"
			                },
						    {  "key": "description",
						    	"name": "角色描述"
						    },
		                    {
		                    	"key": "dynamicRoleResolve",
			                    "name": "动态解析对象"
		                    },
						    {
						    	"key": "dynamicRoleParm",
						    	"name": "动态解析参数"
						    },
						    {
						    	"key": "operator",
						    	"name": "操作者"
						    },
						    {
		                    	"key": "updateTime",
		                    	"name": "操作时间"
		                    },
		                    {
		                    	"key": "systemopt",
			                    "name": "操作"
		                    }
		                  ],
		      'rows': response.data.data.resultList,
		      'pagination': response.data.data.pagination,
		      "sort-by": "roleName",
		      "sort-order": "asc"
		    }
		  });
	}
	return service;
});