/**
 * 
 */
angular.module('gtilesTasty',['ngTasty'])
	.constant("defaultConfig",{
		"colDef":{
			"isSelectAll" : true,
			"columns" : [{
				"primaryKey":false,
				"isDisplay":false,
				"property":"",
				"desc":"",
				"style":"",
				"rendar":""
			}],
			"opts":{
				
			}
		},
		"init":{"sortBy" : "status","sortOrder" : "desc"},
		"reloadData":""
	})
	.directive('compile', [
            '$compile',
            function ($compile) {
                return {
                    restrict: 'A',
                    link: function (scope, element, attrs) {
                        scope.$watch(attrs.compile, function (new_val) {
                            var link = $compile(new_val);
                            var new_elem = link(scope);
                            element.append(new_elem);
                        });
                    }
                };
            }])
	.directive("gtilesTastyTable",[function(){
		return {
			restrict: 'EA',
		    scope: {
		    	"options" : "="
		    },
		    controller : ["$rootScope","$scope", "$attrs","defaultConfig",function($rootScope,$scope, $attrs,defaultConfig){
		    	var customConfig = $scope.options || defaultConfig;
		    	$scope.colDef =  customConfig.colDef;//列定义
		    	$scope.opts = $scope.colDef.opts;//列表操作
		    	$scope.colDef.rowNum = 0;//列表行数
		    	if($scope.colDef.isSelectAll){
		    		++ $scope.colDef.rowNum;
		    	}
		    	angular.forEach($scope.colDef.columns,function(data){
		    		if(data.isDisplay == undefined){
		    			data.isDisplay = true;
		    		}
		    		if(data.isDisplay){
		    			++ $scope.colDef.rowNum;
		    		}
		    		if(data.primaryKey){
		    			$scope.primaryKey = data.property;
		    		}
		    	});
		    	if(!customConfig.loadFun){
		    		throw new Error('loadFun is required,must a function!');
		    	}
		    	$scope.loadFun = customConfig.loadFun;
		    	$scope.init = defaultConfig.init;
		    	if(customConfig.init){
		    		$scope.init = customConfig.init;
		    	}
		    	$scope.initTastyTheme = angular.copy($rootScope.initTastyTheme);
		    	$scope.reloadCallback = function(){};
		    }],
		    link: function ($scope, element, attrs) {
		    	//列表全选
		    	$scope.datagrid ={
		    			selectionAll:false,
		    			selectionIds:[]
		    	};
		    	$scope.reloadDataGrid = function(){
		    		//重置默认值
		    		$scope.datagrid.selectionAll=false;
		    		$scope.datagrid.selectionIds=[];
		    	};
		    	//绑定列表刷新事件
		    	$scope.options.reloadData = function(){
		    		$scope.reloadDataGrid();
		    		$scope.reloadCallback();
		    	}
		    	//绑定列表全选事件
		    	$scope.options.datagrid = $scope.datagrid;
    		},
    		transclude: true,
    		replace: true,
		    template : function(element,attrs){
		    	return '<div><div tasty-table '
					+'  bind-resource-callback="loadFun"  '
					+'	bind-init="init"   '
					+'	bind-theme="initTastyTheme"  '
					+'	bind-reload="reloadCallback"  '
					+'	bind-filters="filterBy"> '
					+'	<table class="table table-gui table-chk  table-striped table-hover table-bordered" > '
					+'		<thead> '
					+'			<tr class="" > '
					+'				<th ng-if="colDef.isSelectAll">'
					+'				<input type="checkbox" grid-selection="all" grid-selection-id="{{primaryKey}}" grid-selection-rows="rows" ng-model="datagrid.selectionAll"/>'
					+'			</th> '
					+'				<th ng-repeat="x in colDef.columns" ng-if="x.isDisplay" ng-style="x.style">{{x.desc}}</th> '
					+'			</tr> '
					+'		</thead> '
					+'		<tbody> '
					+'			<tr ng-repeat="row in rows"> '
					+'				<td class="text-ellipsis" ng-if="colDef.isSelectAll"> '
					+'					<p class="small mb0"><input type="checkbox" grid-selection grid-selection-id="{{primaryKey}}" grid-selection-row="row" ng-model="row.selected"/></p> '
					+'				</td> '
					+'				<td class="text-ellipsis" ng-repeat="x in colDef.columns" ng-if="x.isDisplay" ng-style="x.style">'
					+'					<p ng-if="x.rendar" compile="x.rendar"></p>'			
					+'					<p ng-if="!x.rendar" ng-bind="row.{{x.property}}"></p>'			
					+'				</td> '
					+'			</tr>'
					+'		</tbody> '
					+'		<tfoot> '
					+'			<tr> '
					+'				<td colspan="{{colDef.rowNum}}" class="text-right"> '
					+'					<div tasty-pagination  template-url="../common/angularjs/gtiles_paginatione.html"></div> '
					+'				</td> '
					+'			</tr> '
					+'		</tfoot> '
					+'	</table> '
					+' </div></div>';
		    }
		};
	}]);