app.controller('imgJcropctrl',function($scope) {
	$scope.option={};//图片裁剪配置对象
	$scope.uploadfilie = function (dataUrl) {
        Upload.upload({
            url: '../workbench/courseinfo/course/uploadCourseImage.json',
        data: {
            file: dataUrl
        },
    }).progress(function (evt) {
		//进度条
		$scope.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
		$scope.barstyle = {width: $scope.progressPercentage+"%"}
	}).then(function(resp) {
		  // file is uploaded successfully
		  console.log('file ' + resp.config.data.file.name + 'is uploaded successfully. Response: ' + resp.data);
		}, function(resp) {
			// file is uploaded $error
		  console.log(resp)
		}, function(evt) {
		  // progress notify
		  console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total) + '% file :'+ evt.config.data.file.name);
		});
  	};
});
