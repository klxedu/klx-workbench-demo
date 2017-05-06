var app = angular.module('selectTree',['treeControl']);
app.directive("selectTree",function($timeout){
	return{
		restrict:"AE",
		scope:{
			treeData:"=",
			selectTreeOptions:"=",
			searchCriteria:"=",
			selectedTreeNode:"=",
			showDirection:"=",
			showLable:"@",
			onSelect:"&"
		},
		replace:true,
		link:function(scope,element,attr){
			scope.selectedTreeNode?"":scope.selectedTreeNode={};
			scope.showLable?"":scope.showLable='title';
			scope.lable=scope.selectedTreeNode[scope.showLable];
			scope.showSelected=function(node){
				var newnode = jQuery.extend(true, {}, node);
				scope.selectedTreeNode=newnode;
				scope.showSelectedViewStart=false;
				$timeout(function(){
					scope.onSelect({node:newnode});			
				},1)
			}
			scope.showSelectedView=function(){
			 	scope.showSelectedViewStart=true;
			}
			scope.nodeToggle=function(){
				$timeout(function(){
					element.find("i").css("left",element.find(".selTree").innerWidth()-20);
					element.find("input").innerWidth(element.find(".selTree").innerWidth());
				},10);
			}
			scope.clear=function(){
				scope.selectedTreeNode=undefined;
				scope.selected=undefined;
				$timeout(function(){
					scope.onSelect({node:undefined});
					scope.showSelectedViewStart=false;
				},1)
			}
			element.click(function(event){
				event.stopPropagation();
			});
			$(document).click(function(){
				$timeout(function(){
					scope.showSelectedViewStart=false;
				},1);
			});
		},
		template:	'<div class="form-group" id="selectTree" style="position: relative;">'
						+'<input ng-change="onChange()" ng-model="selectedTreeNode[showLable]" ng-focus="showSelectedView()" class="form-control" size="16" type="text" value="" style="width:100%;transition: all 0.5s;">'
						+'<i class="glyphicon glyphicon-remove clear" ng-click="clear()" style="transition: all 0.5s;"></i>'
						+'<div ng-show="showSelectedViewStart" ng-class="{false:\'bottom\',true:\'top\'}[showDirection==\'bottom\']" class="selTree" style="transition: all 0.5s;">'
							+'<treecontrol class="tree-light" tree-model="treeData" options="selectTreeOptions" on-node-toggle="nodeToggle()" on-selection="showSelected(node)" selected-node="selected" expanded-nodes="dataForTheTreeSel">'
								+'<span class="{{node.id}}">{{node[showLable]}}</span>'
							+'</treecontrol>'
						+'</div>'
					+'</div>'
	}
})