app.controller('uploadingctrl',function($scope,uploadingservice,Upload) {
	
	
  $scope.uploadfilie = function (dataUrl) {
        Upload.upload({
            url: '../workbench/courseinfo/course/uploadCourseImage.json',
        data: {
        	//'queryCourseId':$scope.courseImage.courseId,
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
  
});
app.filter("Yannis",function(){
	return function(parameter,message){		
		var fileKb=parseInt(parameter/1024);
		var fileMb=parseInt(parameter/(1024*1024));
		if(fileKb>0&&fileMb>0){
			fileKb=fileKb-(1024*fileMb);
			return fileMb+"Mb"+fileKb+"Kb";
		}
		else if(fileKb>0&&fileMb==0){
			return fileKb+"Kb";
		}
		else if(parameter>0&&fileKb==0){
			return parameter+"Byte"
		}
		else{
			return;
		}
		
	}
})
