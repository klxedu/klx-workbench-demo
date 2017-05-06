var app = angular.module('Module.classify', [])
app.factory('classifyservice',function($http) {
	var service = {};
	service.clasify = function() {
		return $http({
	            method  : "get",
	            url     : "components/workbenchdemo/classify/clasify.json"
        })
	}
	return service;
});
