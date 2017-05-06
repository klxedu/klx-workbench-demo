app.controller('basiciinformationctrl',function($scope,basiciinformationservice) {
   	$scope.pets = {
    	yannis: '老司机',
        huguangjun: '教授',
        lizhikai: 'DJ凯',
        123: 'DJ凯2',
        456: 'DJ凯3',
        789: 'DJ凯4'
    };
    $scope.a=function(){
    	$scope.beer=["yannis"];
    }
    $scope.b=function(){
    	console.log($scope.upfile);
    }
    $scope.uploadFilesss=function(file){
    	var imgW=$("#photoImg").parent().width();
    	var imgH=imgW/7*10;
    	if(imgH>($("#photoImg").parent().height()-10)){
    		imgH=$("#photoImg").parent().height()-10;
    	}
    	$("#photoImg").width(imgW);
    	$("#photoImg").height(imgH);
    }
});
