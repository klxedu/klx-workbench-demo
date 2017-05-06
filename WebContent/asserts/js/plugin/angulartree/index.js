
angular.module('Module.treemenu',['treeControl'])
.run(function($rootScope){
	$rootScope.dataForTheTree = 
			    {
			     "name" : "在线学习",
			      "children" : [
			        { "name" : "行领导","hash" : "Boss" ,"id" : 999, "children" : [] },
			        { "name" : "总行部门",  "children" : [
			            { "name" : "办公室", "children" : [
			                { "name" : "Min","hash" : "Min" ,"id" : 0,"children" : [] },
			                { "name" : "Max","hash" : "Max" ,"id" : 1, "children" : [] }
			            ]},
			            {"name" : "战略规划部","id" : 1,"children":[]},
			            {"name" : "资产负债管理部","id" : 2,"children": []},
			            {"name" : "人力资源部","id" : 3,"children": []},
			            {"name" : "财务会计","id" : 4,"children": []},
			            {"name" : "国际部","id" : 5,"children": []},
			            {"name" : "公司业务部","id" : 6,"children": []},
			            {"name" : "交通运输融资部","children": []},
			            {"name" : "铁路电力融资部","children": []},
			            {"name" : "营运部","children": []},
			            {"name" : "行政部","children": []},
			            {"name" : "监察室","children": []},
			            {"name" : "中会","children": []},
			            {"name" : "中合担保","children": []},
			            {"name" : "党校","children": []},
			            {"name" : "评估审查部","children": []},
			            {"name" : "国际业务部","children": []}
			        ]}
			    ]},
			       {
			     "name" : "信息管理",
			      "children" : [
			        { "name" : "行领导","hash" : "Boss" , "children" : [] },
			        { "name" : "总行部门",  "children" : [
			            { "name" : "办公室", "children" : [
			                { "name" : "Min","hash" : "Min" ,"children" : [] },
			                { "name" : "Max","hash" : "Max" , "children" : [] }
			            ]},
			            {"name" : "战略规划部","hash" : "tactic" ,"children":[]},
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
			            {"name" : "国际业务部","children": []}
			        ]}
			    ]},
			       {
			     "name" : "用户管理",
			      "children" : [
			        { "name" : "行领导","hash" : "Boss" , "children" : [] },
			        { "name" : "总行部门",  "children" : [
			            { "name" : "办公室", "children" : [
			                { "name" : "Min","hash" : "Min" ,"children" : [] },
			                { "name" : "Max","hash" : "Max" , "children" : [] }
			            ]},
			            {"name" : "战略规划部","hash" : "tactic" ,"children":[]},
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
			            {"name" : "国际业务部","children": []}
			        ]}
			    ]},
			       {
			     "name" : "系统管理",
			      "children" : [
			        { "name" : "行领导","hash" : "Boss" , "children" : [] },
			        { "name" : "总行部门",  "children" : [
			            { "name" : "办公室", "children" : [
			                { "name" : "Min","hash" : "Min" ,"children" : [] },
			                { "name" : "Max","hash" : "Max" , "children" : [] }
			            ]},
			            {"name" : "战略规划部","hash" : "tactic" ,"children":[]},
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
			            {"name" : "国际业务部","children": []}
			        ]}
			    ]},
			       {
			     "name" : "账户管理",
			      "children" : [
			        { "name" : "行领导","hash" : "Boss" , "children" : [] },
			        { "name" : "总行部门",  "children" : [
			            { "name" : "办公室", "children" : [
			                { "name" : "Min","hash" : "Min" ,"children" : [] },
			                { "name" : "Max","hash" : "Max" , "children" : [] }
			            ]},
			            {"name" : "战略规划部","hash" : "tactic" ,"children":[]},
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
			            {"name" : "国际业务部","children": []}
			        ]}
			    ]},
			       {
			     "name" : "前端模板",
			      "children" : [
			        { "name" : "行领导","hash" : "Boss" , "children" : [] },
			        { "name" : "总行部门",  "children" : [
			            { "name" : "办公室", "children" : [
			                { "name" : "Min","hash" : "Min" ,"children" : [] },
			                { "name" : "Max","hash" : "Max" , "children" : [] }
			            ]},
			            {"name" : "战略规划部","hash" : "tactic" ,"children":[]},
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
			            {"name" : "国际业务部","children": []}
			        ]}
			    ]}
			    $rootScope.changeMain = function(data){
			    	
			    }
	
})