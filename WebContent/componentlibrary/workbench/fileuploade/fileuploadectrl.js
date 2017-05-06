app.controller('fileuploadectrl',function($scope,Upload) {
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
	}).then(function (response) {
    });
  };
  $scope.abc=123;
  $scope.uploadFilesss=function(file){
  	console.log(file);
  }
});