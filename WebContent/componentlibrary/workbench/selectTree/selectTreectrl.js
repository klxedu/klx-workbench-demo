app.controller('selectTreectrl',function($scope) {
$scope.selectedTreeNode="";
$scope.onSelect=function(node){
	console.log($scope.selectedTreeNode);
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

});
