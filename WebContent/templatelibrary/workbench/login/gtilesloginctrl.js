var app = angular.module('Module.gtileslogin', [])
.controller('gtilesloginctrl',function($scope,$rootScope,$http,$stateParams) {
	$scope.requirelogin = $stateParams.data;
	/*$http.get("../workbench/getUserSession.json").then(function(response){
		if(response.status==200){
			if(response.data.success){
				$rootScope.$state.go('index.main');
			}
		}
	});*/
	$scope.myKeyup = function(e){
        var keycode = window.event?e.keyCode:e.which;
        if(keycode==13){
            $scope.gtileslogin();
        }
    };
    
    $scope.gtileslogin  = function(){
    	
    	var userInfo = $scope.useraccount;
    	if(!userInfo){
    		$scope.loginError = "用户名和密码不能为空";
    		return;
    	}else if(!userInfo.userName || $.trim(userInfo.userName)==''){
    		$scope.loginError = "用户名不能为空";
    		return;
    	}else if(!userInfo.password || $.trim(userInfo.password)==''){
    		$scope.loginError = "密码不能为空";
    		return;
    	}
    	userInfo.password = $.md5(userInfo.password); 
    	$http({
			method : "post",
			url : "../workbench/login.json",
			data : userInfo
		}).success(function(data) {
			if(data.success){
				$rootScope.current_user = data.data;
				if(data.data){
					localStorage["swbUserId"]=data.data.swbUserId;
				}
				$rootScope.$state.go(data.data.startpath);
				$rootScope.startpath = data.data.startpath;
			}else{
				var msg = "用户名或密码错误";
				if(data.message){
					msg = data.message;
				}
				$scope.loginError = msg;
			}
		});
    	
    }

});
