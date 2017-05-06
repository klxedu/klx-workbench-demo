app.controller('signinctrl',function($scope,signinservice) {
	$scope.imgSrc="";
	$scope.imgDetaliState=false;
	$scope.imgurl=["../asserts/css/patterns/a4.jpg"]
	$scope.showPhoto=function(x){
		$scope.imgDetaliState=true;
		$scope.imgSrc=x;
	}
	$scope.imgDetailShow=function(){
		$scope.imgDetaliState=false;
	}
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
