app.controller('treegridctrl', function($scope, $rootScope, treegridservice) {
	var tree;
	// 数据中添加path，代表品他在当前
	var myTreeData = [ {
		Name : "USA",
		Area : 9826675,
		Population : 318212000,
		TimeZone : "UTC -5 to -10",
		"path" : [ 0 ],
		"state" : true,
		"rankInput" : false,
		"sort" : 0,
		children : [ {
			Name : "California",
			Area : 423970,
			Population : 38340000,
			TimeZone : "Pacific Time",
			"path" : [ 0, 0 ],
			"state" : true,
			"sort" : 0,
			children : [ {
				Name : "San Francisco",
				Area : 231,
				Population : 837442,
				TimeZone : "PST",
				"path" : [ 0, 0, 0 ],
				"state" : true,
				"sort" : 0
			}, {
				Name : "Los Angeles",
				Area : 503,
				Population : 3904657,
				TimeZone : "PST",
				"path" : [ 0, 0, 1 ],
				"state" : true,
				"sort" : 1
			} ]
		}, {
			Name : "Illinois",
			Area : 57914,
			Population : 12882135,
			TimeZone : "Central Time Zone",
			"path" : [ 0, 1 ],
			"state" : true,
			"sort" : 1,
			children : [ {
				Name : "Chicago",
				Area : 234,
				Population : 2695598,
				TimeZone : "CST",
				"path" : [ 0, 1, 0 ],
				"state" : true,
				"sort" : 0,
			} ]
		} ]
	}, {
		Name : "Texas",
		Area : 268581,
		Population : 26448193,
		TimeZone : "Mountain",
		"path" : [ 1 ],
		"state" : true,
		"sort" : 1
	} ];

	// 点击展开列
	$scope.expand_to = {
		"field" : "Name",
		"displayName" : "分类名称",
		"sortable" : false
	};
	// 树数据
	$scope.tree_data = myTreeData;
	$scope.my_tree = tree = {};
	$scope.my_tree.sortColumn = {
		"sortDirection" : "asc",
		"sortingType" : "number",
		"field" : "sort"
	};
	// 自定义列表列
	$scope.col_defs = [ {
		field : "Area",
		displayName : "分类编码"
	} ];

	$scope.addTreeNode = function() {
		// ajax 新增请求
		$scope.tree_data.push({
			Name : "Texas11",
			Area : 26858111,
			Population : 26448193,
			TimeZone : "Mountain",
			"state" : true,
			"sort" : 10
		});
	}

	/**
	 * 启用按钮操作事件
	 * 
	 * @param branch
	 *            树节点对象
	 * @param callback
	 *            回调方法
	 */
	$scope.onStateChange = function(branch, callback) {

		// branch.state = !branch.state;
		// 回调对象说明
		// success，是否成功 true/false
		// branch，当前修改行，必须回传
		var callBackObject = {
			"success" : false,
			"branch" : branch
		};
		callback(callBackObject);
	}
	/**
	 * 修改排序事件
	 * 
	 * @param branch
	 *            树节点对象
	 * @param fixedVal
	 *            修改值
	 * @param callback
	 *            回调方法 <br/> { "success" : true "sort" : { "sortDirection" :
	 *            "asc", "sortingType" : "number", "field" : "sort" }, "branch" :
	 *            branch }
	 */
	$scope.onTreeRank = function(branch,fixedVal, callback) {
		// 回调对象说明
		// success，是否成功 true/false
		// sort，排序对象
		// branch，当前修改行，必须回传
		//console.log(fixedVal);
		var callBackObject = {
			"success" : true,
			"sort" : {
				"sortDirection" : "asc",
				"sortingType" : "number",
				"field" : "sort"
			},
			"branch" : branch
		};
		// 该方法支持异步调用
		callback(callBackObject);
	}

	/**
	 * 操作列事件
	 * 
	 * @param branch
	 *            树节点对象
	 * @param operate_type
	 *            操作类型（用户自定义）
	 * @param callback
	 */
	$scope.onBranchOperation = function(branch, operate_type, callback) {
		// 1、根据自定义操作实现操作过程
		// 2、操作成功后，需要根据操作类型调整branch内容。
		// 例如：
		// branch.sort=10;
		// branch.children.push({});

		// 回调对象说明
		// success，是否成功 true/false
		// sort，排序对象
		// branch，当前修改行，必须回传
		// var callBackObject = {
		// "success" : true,
		// "sort" : {
		// "sortDirection" : "asc",
		// "sortingType" : "number",
		// "field" : "sort"
		// }
		// };
		// // 该方法支持异步调用
		// callback(callBackObject);
		$scope.operateBranch = branch;
		if (operate_type == 'add') {
			$("#sm-Model").modal("show");
		}
		if (operate_type == 'delete') {
			$scope.my_tree.remove_selected_branch(branch);
		}
	}

	// 保存树节点
	$scope.saveTreeNode = function() {
		var node = {
			Name : "addTest",
			Area : 234,
			Population : 2695598,
			TimeZone : "CST",
			"state" : true,
			"sort" : 0
		};
		if ($scope.operateBranch.children) {
			$scope.operateBranch.children.push(node);
		} else {
			$scope.operateBranch.children = [ node ];
		}
		//$scope.operateBranch.sort = 10;
		// 重新排序
		$scope.my_tree.sort_recursive($scope.tree_data,$scope.my_tree.sortColumn, false);
		$("#sm-Model").modal("hide");
	}

});
