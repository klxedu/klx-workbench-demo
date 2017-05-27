angular.module('Module.modificationmenu',['ui.tree'])
.factory('modificationmenuservice',function($http) {
	var service = {};
	return service;
})
.controller("modificationmenuctrl",function($scope,modificationmenuservice){
	$scope.lables=[{
				    "id": 112,
				    "title": "lable2 - item22",
				    "icon":"glyphicon glyphicon-tasks",
				    "nodes": []
				  },
				  {
				    "id": 113,
				    "title": "lable2 - item33",
				    "icon":"glyphicon glyphicon-tasks",
				    "nodes": []
				  },
				  {
				    "id": 111,
				    "title": "lable2 - item11",
				    "icon":"glyphicon glyphicon-tasks",
				    "nodes": []
				  },
				  {
				    "id": 114,
				    "title": "lable2 - item44",
				    "icon":"glyphicon glyphicon-tasks",
				    "nodes": []
				  }]
	$scope.item=[{
				    "id": 12,
				    "title": "tree2 - item22",
				    "icon":"glyphicon glyphicon-tasks",
				    "nodes": []
				  },
				  {
				    "id": 13,
				    "title": "tree2 - item33",
				    "icon":"glyphicon glyphicon-tasks",
				    "nodes": []
				  },
				  {
				    "id": 11,
				    "title": "tree2 - item11",
				    "icon":"glyphicon glyphicon-tasks",
				    "nodes": []
				  },
				  {
				    "id": 14,
				    "title": "tree2 - item44",
				    "icon":"glyphicon glyphicon-tasks",
				    "nodes": []
				  }]
	$scope.data=[
	  {
	    "id": 2,
	    "title": "tree2 - item2",
	    "icon":"glyphicon glyphicon-tasks",
	    "nodes": []
	  },
	  {
	    "id": 3,
	    "title": "tree2 - item3",
	    "icon":"glyphicon glyphicon-tasks",
	    "nodes": []
	  },
	  {
	    "id": 1,
	    "title": "tree2 - item1",
	    "icon":"glyphicon glyphicon-tasks",
	    "nodes":[],
	    "item": [{
					    "id": 12,
					    "title": "tree2 - item22",
					    "icon":"glyphicon glyphicon-tasks",
					    "nodes": []
					  },
					  {
					    "id": 13,
					    "title": "tree2 - item33",
					    "icon":"glyphicon glyphicon-tasks",
					    "nodes": []
					  },
					  {
					    "id": 11,
					    "title": "tree2 - item11",
					    "icon":"glyphicon glyphicon-tasks",
					    "nodes": []
					  },
					  {
					    "id": 14,
					    "title": "tree2 - item44",
					    "icon":"glyphicon glyphicon-tasks",
					    "nodes": []
					  }]
	  },
	  {
	    "id": 4,
	    "title": "tree2 - item4",
	    "icon":"glyphicon glyphicon-tasks",
	    "nodes": [],
	    "item": [
					  {
					    "id": 42,
					    "title": "tree2 - item22",
					    "icon":"glyphicon glyphicon-tasks",
					    "nodes": []
					  },
					  {
					    "id": 43,
					    "title": "tree2 - item33",
					    "icon":"glyphicon glyphicon-tasks",
					    "nodes": []
					  },
					  {
					    "id": 41,
					    "title": "tree2 - item11",
					    "icon":"glyphicon glyphicon-tasks",
					    "nodes": []
					  },
					  {
					    "id": 44,
					    "title": "tree2 - item44",
					    "icon":"glyphicon glyphicon-tasks",
					    "nodes": []
					  }
				]
	  }
	]
	$scope.pushItme = function(i){
		$scope.item.push($scope.lables.splice(i,1)[0]);
	};
	$scope.pushLable = function(i){
		$scope.lables.push($scope.item.splice(i,1)[0]);
	};
	$scope.remove = function(scope) {
        scope.remove();
   	};
   	$scope.allPushLabel = function(){
   		for (var i=0,j=$scope.item.length;i<j;i++) {
   			$scope.lables.push($scope.item[i]);
   		}
   		$scope.item=[];
   	};
   	$scope.select=function(scope){
   		console.log(scope.$modelValue,"sclect")
   		$scope.item=scope.$modelValue.item;
   		$scope.selectNode=scope.$modelValue;
   	};
   	
    //编辑功能
    $scope.edit = function(scope) {
		var index = $scope.data[3].item.indexOf(scope.$modelValue);
		scope.$modelValue.title="aaa";
    };
    $scope.treeOptions = {
	    beforeDrop: function(e) {
	    	for(var i=0,j=e.dest.nodesScope.$modelValue.length;i<j;i++){
	    		if(e.dest.nodesScope.$modelValue[i].id==e.source.nodeScope.$modelValue.id){
	    			console.log(e.source.nodeScope.$modelValue, e.dest.nodesScope.$modelValue,"true");
	    			return true;
	    		}
	    	}
	    	console.log(e.source.nodeScope.$modelValue, e.dest.nodesScope.$modelValue,"false");
	      return false;
	    }
  	};
})