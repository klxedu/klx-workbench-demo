var app = angular.module('Module.tasty', ['ngTasty'])
app.factory('tastyctrlservice',function($http) {
	var service = {};
	service.dataGrid = function(params, paramsObj) {
		var url = "workbench/tasty/tasty.json";

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
app.filter("safehtml",function($sce){

});
