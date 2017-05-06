var app = angular.module('Module.textedit', ['summernote','ngSanitize'])
app.factory('texteditservice',function() {
	var service = {};
		
	return service;
});
app.filter("safehtml",function($sce){
	return function(value){
		 return $sce.trustAsHtml(value); 
	}
});
