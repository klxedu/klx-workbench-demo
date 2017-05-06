app.controller('StandardListCtrl', function($scope, StandardListService,$timeout) {
	//表格数据
	$scope.dataRows=[{courseName:"12爱爱啊3123123123123123实打实312爱爱啊3123123123123123实打实312爱爱啊3123123123123123实打实312爱爱啊3123123123123123实打实312爱爱啊3123123123123123实打实3",activeState:2,publishState:"2",studyScore:50,modifyUserName:"aa"},
					{courseName:"123",activeState:1,publishState:"1",studyScore:50,modifyUserName:"aa"}]
	
	
	
	$scope.griddata=null;
	/* 控制摸态框显示 */
	$scope.openmodel = function() {
			$('#md-Modal').modal('show')
		}
		/* 定义日期控件初始属性 */
		// $scope.datePicker.date = {startDate: null, endDate: null};

	$scope.updisabled = false;
	$scope.uptext = '提交';
	
	$scope.up = function() {
		return StandardListService.uploadForm($scope.DemoUser, function callback(data) {
			$('#validation-Modal').modal('hide');
		});
	}
	$scope.dataGrid=function(params,paramsObj){
		//重置全选
		$scope.tableState.selectAll = false;
		$scope.ckListStr = '';
		return StandardListService.dataGrid(params,paramsObj);
	}
	
	/*
	 * 列表树
	 */
	$scope.url="components/workbenchdemo/uiselect/selectdata.json";
	/**
	 * 批量删除
	 */
	$scope.batchDel = function(){
		console.log($scope.ckListStr);
	}
	//全选及列表选择实现-------------------------------------------------------------------------------------------
	// 复选框选择数据字符串
	$scope.ckListStr = '';
	//列表状态对象
	$scope.tableState = {
			selectAll : false//是否全选
	};
	/**
	 * 复选框勾选事件
	 * 
	 * @param $row
	 *            选中行
	 */
	$scope.changeSelection = function($row){
		if($row.selected){
			$scope.ckListStr += $row.courseId + ",";
		}else{
			if($scope.tableState.selectAll){
				$scope.tableState.selectAll = false;
			}
			$scope.ckListStr = $scope.ckListStr.replace($row.courseId + ",","");
		}
	}
	/**
	 * 复选框全选
	 */
	$scope.changeSelectionAll=function($rows){
		if($scope.tableState.selectAll){
			angular.forEach($rows,function(data){
				data.selected = true;
				$scope.ckListStr += data.courseId + ",";
			});
		}else{
			angular.forEach($rows,function(data){
				data.selected = false;
			});
			$scope.ckListStr = "";
		}
	}
	//end--------------------------------------------------------------------------------------------
	$scope.tabalert = function() {
		alert("the value is --->"+$scope.tabmodel.classdate);
	}
	
	$scope.tabmodel =  {
		classdate:{startDate: new Date(1137075575000), endDate: new Date(1478563200000)}
	};
	$scope.init = {'sortBy' : 'status','sortOrder' : 'desc'}; // 排序
	$scope.getuserdata = function(params, paramsObj) {
		params+="&queryActiveState=1&queryUserName=";
		return StandardListService.findList(params, paramsObj);
	}
	$scope.getuserdatauitab = function(params, paramsObj) {
		params+="&queryActiveState=1&queryUserName=";
		return StandardListService.findList(params, paramsObj);
	}

	$scope.reloadUserdata=function(){}
	
	$scope.reloadUserdatauitab=function(){
	}
	
	$scope.usrdatasearch = function(){
		$scope.reloadUserdata();
	}
	
	$scope.usrdatasearchuitab = function(){
		$scope.reloadUserdatauitab();
	}
	
    $scope.selecteditmes = new Object();
    $scope.selecteditmes.id = [];
    $scope.selecteditmes.rows = [];
      
	$scope.dependencemodal = function (size) {
		  StandardListService.showuserdialog(size,$scope.selecteditmes).result.then(function (selectitems) {
			  debugger;
			  $scope.selecteditmes.id = selectitems.id;
			  $scope.selecteditmes.rows = selectitems.rows;
	      });
	 };
	 
	 
	 //树
	$scope.selectedTreeNode="";
	$scope.onSelect=function(){
		console.log($scope.selectedTreeNode);
	}
	$scope.console=function(){
		console.log($scope.selectedTreeNode);
	}
	$scope.addNode=function(){
		$('#md-Modal').modal('show');
	}
	$scope.addRoot = function() {
	    $scope.treedata.children.push({"name": $scope.organizationName, "id":$scope.organizationID, children: []});
	    $('#md-Modal').modal('hide');
	 };
	$scope.remNode=function(row,index){
		if(row.children.length>0){
			$scope.remStart=0;
		}else{
			$scope.remStart=1;
		}
		if($scope.remStart == 1){		
			//该循环用于将选中的对象在树中找到对应的下标
			for(var i=0;i<$scope.treedata.children.length;i++){
				if($scope.treedata.children[i].id==row.id){
					$scope.rem=i;
					break;			
				}
			}
			$scope.remMessage="确认要删除"+$scope.treedata.children[$scope.rem].name;
		}else{
			$scope.remMessage="操作错误，当前节点下有子集的节点";
		}
		$('#rem-Model').modal('show');
	
	}
	$scope.remRoot=function(){
		$('#rem-Model').modal('hide');
		$scope.treedata.children.splice($scope.rem,1)
	}
	$scope.selectTreeOptions = {
	    nodeChildren: "children",
	    dirSelectable: true,
	    injectClasses: {
	        ul: "aa1",
	        li: "aa2",
	        liSelected: "aa7",
	        iExpanded: "aa3",
	        iCollapsed: "aa4",
	        iLeaf: "aa5",
	        label: "aa6",
	        labelSelected: "aa8",
	    },
	}
	$scope.dataForTheTree =
	[
	    { "name" : "前端模板", "id" : "1", "children" : [
	        { "name" : "行领导","id" : "1.1" , "children" : []},
	        { "name" : "总行部门","id" : "1.2",  "children" : [
	            { "name" : "办公室","id" : "1.2.1", "children" : [
	                { "name" : "Min","id" : "1.2.1.1" ,"children" : [] },
	                { "name" : "Max","id" : "1.2.1.2" , "children" : [
	                	{"name" : "战略规划部","id" : "1.2.1.1.1" ,"children":[
		                	{"name" : "资产负债管理部1", "id" : "1.2.1.1.2.1", "children": [
		                		{"name" : "资产负债管理部2", "id" : "1.2.1.1.2", "children": [
		                			{"name" : "资产负债管理部3", "id" : "1.2.1.1.2", "children": [
		                				{"name" : "资产负债管理部4", "id" : "1.2.1.1.2", "children": []},
						        		{"name" : "人力资源部4", "id" : "1.2.1.1.3" ,"children": []},
						        		{"name" : "财务会计4", "id" : "1.2.1.1.4" ,"children": []}
		                			]},
					        		{"name" : "人力资源部3", "id" : "1.2.1.1.3" ,"children": []},
					        		{"name" : "财务会计3", "id" : "1.2.1.1.4" ,"children": []}
		                		]},
		        				{"name" : "人力资源部2", "id" : "1.2.1.1.3" ,"children": []},
		        				{"name" : "财务会计2", "id" : "1.2.1.1.4" ,"children": []}
		                	]},
			        		{"name" : "人力资源部1", "id" : "1.2.1.1.3.2" ,"children": []},
			        		{"name" : "财务会计1", "id" : "1.2.1.1.4.3" ,"children": []}
	                	]},
		        		{"name" : "资产负债管理部", "id" : "1.2.1.1.2", "children": []},
		        		{"name" : "人力资源部", "id" : "1.2.1.1.3" ,"children": []},
		        		{"name" : "财务会计", "id" : "1.2.1.1.4" ,"children": []}
	                ]}
	        	]},
		        {"name" : "战略规划部","id" : "tactic" ,"children":[]},
		        {"name" : "资产负债管理部","children": []},
		        {"name" : "人力资源部","children": []},
		        {"name" : "财务会计","children": []},
		        {"name" : "国际部","children": []},
		        {"name" : "公司业务部","children": []},
		        {"name" : "交通运输融资部","children": []},
		        {"name" : "铁路电力融资部","children": []},
		        {"name" : "营运部","children": []},
		        {"name" : "行政部","children": []},
		        {"name" : "监察室","children": []},
		        {"name" : "中会","children": []},
		        {"name" : "中合担保","children": []},
		        {"name" : "党校","children": []},
		        {"name" : "评估审查部","children": []},
		        {"name" : "公司业务部","children": []},
		        {"name" : "交通运输融资部","children": []},
		        {"name" : "国际业务部","children": []}
	    	]}
	    ]}
	]
	$scope.dataForTheTreeSel=[$scope.dataForTheTree[0]]
});