app.controller('treectrl',function($scope) {
$scope.showSelected=function(node){
	$scope.treedata=node;
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


$scope.treeOptions = {
    nodeChildren: "children",
    dirSelectable: true,
    injectClasses: {
        ul: "a1",
        li: "a2",
        liSelected: "a7",
        iExpanded: "a3",
        iCollapsed: "a4",
        iLeaf: "a5",
        label: "a6",
        labelSelected: "a8"
    }
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
$scope.dataForTheTreeSel=[$scope.dataForTheTree[0],$scope.dataForTheTree[0].children[1]]
});
