app.controller('imgJcropctrl',function($scope,Upload) {
	$scope.option={};//图片裁剪配置对象
	$scope.fileInit=function(){
		Upload.setDefaults({
			ngfMaxSize:20000000,
			ngfPattern:"'image/*'"
		})
	};
	$scope.uploadfilie = function (dataUrl,data) {
		console.log(dataUrl,data);
        Upload.upload({
            url: '../workbench/courseinfo/course/uploadCourseImage.json',
        data: {
            "file": dataUrl,
            "data":data
        },
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
