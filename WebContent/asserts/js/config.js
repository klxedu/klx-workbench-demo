/**
 * klxTemplate - Responsive Admin Theme
 * 
 * klxTemplate theme use AngularUI Router to manage routing and views Each
 * view are defined as state. Initial there are written state for all view in
 * theme.
 * 
 */
function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider,$httpProvider,growlProvider,$translateProvider) {
	$translateProvider.useStaticFilesLoader({
		  files: [{
		      prefix: 'asserts/js/plugin/formValidation/locales/',
		      suffix: '.json'
		    }]
    });
	$translateProvider.preferredLanguage('zh');
	$translateProvider.useSanitizeValueStrategy(null);
	
	$urlRouterProvider.otherwise("/login/false");
    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
    });
    $stateProvider
        .state('index', {
            abstract: true,
            url: "/index",
            templateUrl: "asserts/html/views/common/content.html",
        })
        .state('index.main', {
            url: "/main",
            templateUrl: "asserts/html/views/main.html",
            data: { pageTitle: '' },
            controller: "MainCtrl",
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                        	serie: true,
                        	name: 'angular-flot',
                            files: ['asserts/js/plugin/flot/jquery.flot.js', 'asserts/js/plugin/flot/jquery.flot.time.js', 'asserts/js/plugin/flot/jquery.flot.tooltip.min.js', 'asserts/js/plugin/flot/jquery.flot.spline.js', 'asserts/js/plugin/flot/jquery.flot.resize.js', 'asserts/js/plugin/flot/jquery.flot.pie.js', 'asserts/js/plugin/flot/curvedLines.js', 'asserts/js/plugin/flot/angular-flot.js','asserts/js/plugin/flot/excanvas.min.js']
                        }
                    ]);
                }
            }
        })
        .state('index.minor', {
            url: "/minor",
            templateUrl: "asserts/html/views/minor.html",
            data: { pageTitle: '' }
        })
        .state('login', {
            url: "/login/:data",
            templateUrl: "&login-page-url&",
            data: { pageTitle: '', specialClass: 'gray-bg' },
            controller: "gtilesloginctrl",
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Module.gtileslogin',
                            files: ['asserts/js/gtilesloginctrl.js']
                        }
                    ]);
                }
            }
        })
        		
        // workbench security guard
        $httpProvider.interceptors.push(function ($timeout,$q, $injector,$location) {
            var $http, $state;
            // this trick must be done so that we don't receive
            // `Uncaught Error: [$injector:cdep] Circular dependency found`
            
            $timeout(function () {
              $http = $injector.get('$http');
              $state = $injector.get('$state');
            });
            var deferred = $q.defer();
            return {
              responseError: function (rejection) {
              rejection.config.ignoreLoadingBar = false;
              if (rejection.status == 403) {
        		  var paramObj = {data:'true'};
        		  if( typeof($state) != "undefined" ) {
        			  $state.go('login',paramObj);
        		  }
               }
        	  return $q.reject(rejection);
              }
            };
          });
	    // client message
        growlProvider.messagesKey("clientmessagearray");
	    growlProvider.messageTextKey("message_text");
	    growlProvider.messageTitleKey("message_title");
	    growlProvider.messageSeverityKey("message_severity");
	    growlProvider.globalTimeToLive({success: 1000, error: 2000, warning: 3000, info: 4000});
	    growlProvider.globalDisableCountDown(true);
	    $httpProvider.interceptors.push(growlProvider.serverMessagesInterceptor);
	    // prevent double submit
	    $httpProvider.interceptors.push(function($q,$rootScope){
	    	 return {
	    		    'request': function(config) {
	    		    	  if( $rootScope.tokenmessage != {} && config.url.indexOf($rootScope.tokenmessage.verifyMethod) != -1){
	    		    		  config.params = config.params || {};
			    		      config.params.ORCHID_WEB_TOKEN=$rootScope.tokenmessage.token;
	    		    	  }
		    		      return config;
	    		    },
	    		    'response': function (response) {
	    		    	
	    		    	  if (response !== undefined && response.data && response.data["tokenmessage"] ) {
	    		    		  $rootScope.tokenmessage = response.data["tokenmessage"];
	    		          }
	    		    	  if($rootScope.tokenmessage != {} && response.config.url.indexOf( $rootScope.tokenmessage.verifyMethod) != -1){
	    		        		// 如果正常响应，没有带tokenmessage，清空token
	    		        	  $rootScope.tokenmessage = {};
    		        	  }
	    		    	  if(response !== undefined && response.data && response.data.resourceCode){
	    		    		  // 拥有权限Code,字符串
	    		    		  localStorage["resourceCode"]=response.data.resourceCode;
	    		    		  
	    		    	  }
	    		          return response;
	    		     }
	    		  };
	    });
}
angular
    .module('klxTemplate')
    .config(config)
    .run(function($rootScope,$state,$http) {
    	
    	//初始化后台配置信息
    	if(!$rootScope.swbConfiguration){
    		$http.get("../workbench/getSwbConfig.json").success(function(data){
    			$rootScope.swbConfiguration = data.data;
    		});
    	}
    	if(!$rootScope.menuGroupCahce){
    		// 将菜单组和菜单对应规则添加到rootScope中
    		$http.get("../workbench/getGroupMenu.json").success(function(data){
    			$rootScope.menuGroupCahce = data.data;
    		});
    	}
    	// 初始化state跳转code
    	$rootScope.initStateCode = function(menuCode){
    		var stateCode = $rootScope.menuGroupCahce[menuCode];
    		if(stateCode){
    			return stateCode;
    		}
    		return menuCode;
    	}
    	//列表全选
    	$rootScope.datagrid ={
    			selectionAll:false,
    			selectionIds:[]
    	};
    	$rootScope.reloadDataGrid = function(){
    		//重置默认值
    		$rootScope.datagrid.selectionAll=false;
    		$rootScope.datagrid.selectionIds=[];
    	};
    	$rootScope.tokenmessage = {};
        $rootScope.$state = $state;
	     $rootScope.reloadCallback = function() {};
	     $rootScope.initTastyTheme = {
			init : {
				'count' : 15,
				'page' : 1,
				'thead' : true,
				'pagination' : true,
				'filterBase' : false
			},
			query : {
				'page' : 'currentPage',
				'count' : 'pageSize',
				'sortBy' : 'sortBy',
				'sortOrder' : 'sortOrder'
			},
			bootstrapIcon : true,
			loadOnInit : false,
			listItemsPerPage : [ 2, 15, 25, 50, 100 ],
			itemsPerPage : 15,
			loadOnInit : true,
			templateUrl : '../../common/angularjs/gtiles_paginatione.html'}
	     
	     // 增加了清空已选chechbox功能，引用页面在执行批量操作后请调用此功能
	     /*
			 * 样例 ctrl.js中
			 * service.changeActiveStateService($scope.selection,instructionActiveState,function(){
			 * $scope.cleanSelection();//执行批量操作后清空已选checkbox数据
			 * $scope.reloadCallback(); });
			 */
	     $rootScope.leftfooter = '&left-footer&';
	     // 当前用户拥有的角色集合，判断某个功能是否可用
	     $rootScope.isShowFunction=function(resourceCode){
	    	 if(localStorage["swbUserId"]=="admin"){
	    		 return true;
	    	 }
	    	 var resourceCodes=localStorage["resourceCode"];
	    	 if(resourceCodes&&resourceCodes!=""&&resourceCodes!=null){
	    		 return resourceCodes.indexOf(resourceCode)>=0;
	    	 }
	    	 return false;
	     }
    })
    .directive("findDictvalue", function($compile) {// 根据数据字list和key获取字典value
	    return {
	    	restrict: 'E',
	    	scope: {
	    		dictList: '=list',
	    		dictKey: '=key'},
	        link:function(scope,element){
	        	scope.dictValue="";
	        	for(var a in scope.dictList){
	        		if(scope.dictList[a].dictKey==scope.dictKey){
	        			scope.dictValue=scope.dictList[a].dictValue;
	        			break;
	        		}
	        	}
	        },
	        template :'{{dictValue}}'
	    };
    });
