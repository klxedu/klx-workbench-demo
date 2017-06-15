app.controller('imgJcropctrl',function($scope,Upload) {
	$scope.option={};//图片裁剪配置对象
	$scope.doFileUpload = function(file,data){
		console.log(file);
		console.log(data);
	}
});
