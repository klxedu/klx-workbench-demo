var app = angular.module('Module.summernote', ['summernote','ngSanitize'])
app.factory('summernoteservice',function() {
	var service = {};
		
	return service;
});
app.filter("safehtml",function($sce){
	return function(value){
		 return $sce.trustAsHtml(value); 
	}
});
