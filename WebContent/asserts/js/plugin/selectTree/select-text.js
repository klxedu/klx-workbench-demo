var app = angular.module('selectTree',['treeControl']);
app.directive("selectTreeText",function($timeout){
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
			scope.selectedTreeNode[scope.showLable]="请选择";
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
						+'<div ng-click="showSelectedView()" class="text-cont" style="width:100%;">{{selectedTreeNode[showLable]}}<i class="caret"></i></div>'
						+'<div ng-show="showSelectedViewStart" ng-class="{false:\'bottom\',true:\'top\'}[showDirection==\'bottom\']" class="selTree" style="transition: all 0.5s;">'
							+'<treecontrol class="tree-light" tree-model="treeData" options="selectTreeOptions" on-node-toggle="nodeToggle()" on-selection="showSelected(node)" selected-node="selected" expanded-nodes="dataForTheTreeSel">'
								+'<span class="{{node.id}}">{{node[showLable]}}</span>'
							+'</treecontrol>'
						+'</div>'
					+'</div>'
	}
})