app.controller('StandardListCtrl', function($scope, StandardListService, $timeout) {

	$scope.tableOpts = {
		"cols" : [ {
			"operate" : "add",
			"operateText":"新增",
			"operateIcon":"glyphicon glyphicon-plus",
			"event" : function(row) {
				console.log(row);
			}
		}, {
			"operate" : "delete",
			"event" : function(row) {}
		}, {
			"operate" : "edit",
			"event" : function(row) {}
		}, {
			"operate" : "enable",
			"event" : function(row) {}
		}, {
			"operate" : "disable",
			"event" : function(row) {}
		} ]
	};
	$scope.searchCriteria = "1";
	$scope.tfootState = false;
	$scope.dataGrid = function(params, paramsObj) {
		//重置全选
		$scope.tableState.selectAll = false;
		$scope.ckListStr = '';
		return StandardListService.findList(params, paramsObj);
	}

	$scope.reloadCallback = function() {
		$timeout(function() {
			$scope.tfootState = false;
		}, 1)
	};

	/*
	 * 列表树
	 */
	$scope.url = "components/workbenchdemo/uiselect/selectdata.json";
	/**
	 * 批量删除
	 */
	$scope.batchDel = function() {
		console.log($scope.ckListStr);
	}
	//全选及列表选择实现-------------------------------------------------------------------------------------------
	// 复选框选择数据字符串
	$scope.ckListStr = '';
	//列表状态对象
	$scope.tableState = {
		selectAll : false //是否全选
	};

	$scope.init = {
		'sortBy' : 'status',
		'sortOrder' : 'desc'
	}; // 排序


	//表格尾固定

});