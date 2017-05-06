/**
 * 
 */
app.controller('uitabtastyctrl', function($scope,uitabtastyService) {
	
	//标准列表配置
	$scope.standardOption = {
			"colDef":{
				"isSelectAll" : true,//是否全选 必填
				//列表列定义
				"columns" : [{
					"property":"roleId",//属性 必填
					"primaryKey":true,//是否为主键 全选时用，不必填
					"isDisplay":false//是否显示 默认显示
				},{
					"property":"roleName",
					"desc":"角色名称",
					"style":{//列样式
						"width":"70%"
					}
				},{
					"property":"roleCode",
					"desc":"角色编码"
				}]
			},
			// 列表加载方法 必填
			"loadFun":function(params, paramsObj) {
				return uitabtastyService.getRole(params, paramsObj);
			},
			//列表初始化对象 
			"init":{"sortBy" : "status","sortOrder" : "desc"}
		};
	$scope.standardReloadData = function(){
		console.log($scope.standardOption.datagrid.selectionIds);
		$scope.standardOption.reloadData();
	}
	
	//列表二配置
	$scope.table2Option = {
			"colDef":{
				"isSelectAll" : false,
				"columns" : [{
					"property":"userName",
					"desc":"用户名称"
				},{
					"property":"displayName",
					"desc":"显示名称"
				},{
					"property":"activeState",
					"desc":"活动状态",
					"rendar":"<p ng-class=\"row.activeState=='1'?'text-success':'text-danger'\">{{row.activeState=='1'?'启用':'作废'}}</p>"
				},{
					"desc":"操作",
					"rendar":"<div class=\"btn-group manage\"><a confirm=\"确定作废该用户吗？\" confirm-ok=\"确定\" confirm-cancel=\"取消\" confirm-title=\"确认\" confirm-settings=\"{size: 'sm'}\" ng-click='opts.onDelete(row.userName)'>删除</a><a>新增</a></div>"
				}],
				"opts":{
					"onAdd":function(){
						console.log("onAdd...");
					},
					"onUpdate":function(id){
						console.log("onUpdate..."+id);
					},
					"onDelete":function(id){
						console.log("onDelete..."+id);
					}
				}
			},
			"loadFun":function(params, paramsObj) {
				return uitabtastyService.findList(params, paramsObj);
			},
			"init":{"sortBy" : "status","sortOrder" : "desc"}
		};
	$scope.table2ReloadData = function(){
		$scope.table2Option.reloadData();
	}
	
	//列表三配置
	$scope.table3Option = {
			"colDef":{
				"isSelectAll" : true,
				"columns" : [{
					"property":"roleName",
					"desc":"角色名称",
					"rendar":"<p class='text-danger'>哈哈发大水法</p>"
				},{
					"property":"roleCode",
					"desc":"角色编码"
				}]
			},
			"loadFun":function(params, paramsObj) {
				return uitabtastyService.getRole(params, paramsObj);
			},
			"init":{"sortBy" : "status","sortOrder" : "desc"}
		};
	$scope.table3ReloadData = function(){
		console.log($scope.standardOption.datagrid.selectionIds);
		$scope.table3Option.reloadData();
	}
	
});