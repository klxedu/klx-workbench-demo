app.controller('threeLevelctrl',function($scope,threeLevelservice) {
   $scope.classify={}//用于存储当前选中目录
 $scope.firstgo=function(index,a){
  	$scope.thirdly={};
  	$scope.classify={};
  	$scope.second=a.children;
  	$scope.firstactive=[];
  	$scope.secondactive=[];
  	$scope.firstactive[index]="active";
  	$scope.classify.first=a.classifyName;
  }
  $scope.secondgo=function(index,a){
  	$scope.classify.thirdly={};
  	$scope.thirdly=a.children;
  	$scope.secondactive=[];
  	$scope.thirdlyactive=[];
  	$scope.secondactive[index]="active";
  	$scope.classify.second=a.classifyName;
  }
  $scope.thirdlygo=function(index,a){
  	$scope.thirdlyactive=[];
	$scope.thirdlyactive[index]="active";
	$scope.classify.thirdly=a.classifyName;
  }
//数据示例
	jsondata={
		data:[
			    {
			        "classifyName": "a",
			        "children": [
			            {
			                "classifyName": "aa",
			                "children": [
			                    {"classifyName": "aaa1"},
			                    {"classifyName": "aaa2"},
			                    {"classifyName": "aaa3"},
			                    {"classifyName": "aaa4"}
			                ]
			            },
			            {
			                "classifyName": "ab",
			                "children": [
			                    {"classifyName": "aba1"}
			                ]
			            },
			            {
			                "classifyName": "ac",
			                "children": []
			            },
			            {
			                "classifyName": "ad",
			                "children": [
			                    {"classifyName": "ada1"},
			                    {"classifyName": "ada2"},
			                    {"classifyName": "ada3"},
			                    {"classifyName": "ada4"}
			                ]
			            }
			        ]
			    },
			    {
			        "classifyName": "b",
			        "children": [
			            {
			                "classifyName": "ba",
			                "children": [
			                    {"classifyName": "baa1"}
			                ]
			            },
			            {
			                "classifyName": "bb",
			                "children": []
			            }
			        ]
			    },
			    {
			        "classifyName": "c",
			        "children": [
			            {
			                "classifyName": "ca",
			                "children": [
			                    {"classifyName": "caa"}
			                ]
			            },
			            {
			                "classifyName": "cb",
			                "children": []
			            },
			            {
			                "classifyName": "cc",
			                "children": []
			            }
			        ]
			    }
			]
		}
	  $scope.first=jsondata.data;
});
