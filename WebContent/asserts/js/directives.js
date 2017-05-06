/**
 * klxTemplate - Responsive Admin Theme
 *
 */

/**
 * pageTitle - Directive for set Page title - mata title
 */
function pageTitle($rootScope, $timeout,$http) {
	return {
		link : function(scope, element) {
			var listener = function(event, toState, toParams, fromState,
					fromParams) {
				$timeout(function() {
					var title = '';
					if($rootScope.swbConfiguration&&$rootScope.swbConfiguration.title){
						title = $rootScope.swbConfiguration.title;
						element.text(buildTitle(title,toState));
					}else{
						$http.get("../workbench/getSwbConfig.json").success(function(data){
							$rootScope.swbConfiguration = data.data;
			    			element.text(buildTitle($rootScope.swbConfiguration.title,toState));
			    		});
					}
				});
			};
			$rootScope.$on('$stateChangeStart', listener);
		}
	}
}
function buildTitle(pre,toState){
	var title = pre;
	if (toState.data && toState.data.pageTitle)
		title += ' | ' + toState.data.pageTitle;
	return title;
}

/**
 * sideNavigation - Directive for run metsiMenu on sidebar navigation
 */
function sideNavigation($timeout) {
	return {
		restrict : 'A',
		link : function(scope, element) {
			// Call the metsiMenu plugin and plug it to sidebar navigation
			$timeout(function() {
				element.metisMenu();
			});
		}
	};
}

/**
 * iboxTools - Directive for iBox tools elements in right corner of ibox
 */
function iboxTools($timeout) {
	return {
		restrict : 'A',
		scope : true,
		templateUrl : './asserts/html/views/common/ibox_tools.html',
		controller : function($scope, $element) {
			// Function for collapse ibox
			$scope.showhide = function() {
				var ibox = $element.closest('div.ibox');
				var icon = $element.find('i:first');
				var content = ibox.find('div.ibox-content');
				content.slideToggle(200);
				// Toggle icon from up to down
				icon.toggleClass('fa-chevron-up')
						.toggleClass('fa-chevron-down');
				ibox.toggleClass('').toggleClass('border-bottom');
				$timeout(function() {
					ibox.resize();
					ibox.find('[id^=map-]').resize();
				}, 50);
			},
			// Function for close ibox
			$scope.closebox = function() {
				var ibox = $element.closest('div.ibox');
				ibox.remove();
			}
		}
	};
}

/**
 * iboxTools with full screen - Directive for iBox tools elements in right
 * corner of ibox with full screen option
 */
function iboxToolsFullScreen($timeout) {
	return {
		restrict : 'A',
		scope : true,
		templateUrl : 'views/common/ibox_tools_full_screen.html',
		controller : function($scope, $element) {
			// Function for collapse ibox
			$scope.showhide = function() {
				var ibox = $element.closest('div.ibox');
				var icon = $element.find('i:first');
				var content = ibox.find('div.ibox-content');
				content.slideToggle(200);
				// Toggle icon from up to down
				icon.toggleClass('fa-chevron-up')
						.toggleClass('fa-chevron-down');
				ibox.toggleClass('').toggleClass('border-bottom');
				$timeout(function() {
					ibox.resize();
					ibox.find('[id^=map-]').resize();
				}, 50);
			};
			// Function for close ibox
			$scope.closebox = function() {
				var ibox = $element.closest('div.ibox');
				ibox.remove();
			};
			// Function for full screen
			$scope.fullscreen = function() {
				var ibox = $element.closest('div.ibox');
				var button = $element.find('i.fa-expand');
				$('body').toggleClass('fullscreen-ibox-mode');
				button.toggleClass('fa-expand').toggleClass('fa-compress');
				ibox.toggleClass('fullscreen');
				setTimeout(function() {
					$(window).trigger('resize');
				}, 100);
			}
		}
	};
}

/**
 * minimalizaSidebar - Directive for minimalize sidebar
 */
function minimalizaSidebar($timeout) {
	return {
		restrict : 'A',
		template : '<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',
		controller : function($scope, $element) {
			$scope.minimalize = function() {
				$("body").toggleClass("mini-navbar");
				if (!$('body').hasClass('mini-navbar')
						|| $('body').hasClass('body-small')) {
					// Hide menu in order to smoothly turn on when maximize menu
					$('#side-menu').hide();
					// For smoothly turn on menu
					setTimeout(function() {
						$('#side-menu').fadeIn(400);
					}, 200);
				} else if ($('body').hasClass('fixed-sidebar')) {
					$('#side-menu').hide();
					setTimeout(function() {
						$('#side-menu').fadeIn(400);
					}, 100);
				} else {
					// Remove all inline style from jquery fadeIn function to
					// reset menu state
					$('#side-menu').removeAttr('style');
				}
			}
		}
	};
}
/*
 * 选择对话框相关初始化方法
 */
function selectDialogFactory() {
	var service = {};
	service.initSelectDialog = function($scope, $uibModalInstance, items) {
		$scope.dataitem = items;
		$scope.sel = new Object();
		$scope.sel.sel_dialog_id = items.id;
		/*$scope.sel.sel_dialog_name = items.name;*/
		$scope.sel.sel_dialog_rows =[];
		$scope.sel.modelInstance = $uibModalInstance;
	};
	return service;
}
function selectDialog() {
	return {
		restrict : "ECMA",
		scope : true,
		link : function(scope, element, attrs) {
			var rowdata = scope[attrs["selectDialog"]];
			var rowid = attrs["selectId"];
		/*	var rowname = attrs["selectName"];*/
			var selid = rowdata[rowid];
		/*	var selname = rowdata[rowname];*/
			element.on("click", function(e) {
				var checked = element.prop("checked");
				if (checked) {
					scope.sel.sel_dialog_id.push(selid);
			/*		scope.sel.sel_dialog_name.push(rowname);*/
					scope.sel.sel_dialog_rows.push({"id":selid,"row":rowdata});
				} else {
					var idx = scope.sel.sel_dialog_id.indexOf(selid);
					scope.sel.sel_dialog_id.splice(idx, 1);
			/*		scope.sel.sel_dialog_name.splice(idx, 1);*/
					//取消选择则将数组中数据清除
					for(row in scope.sel.sel_dialog_rows){
						if(scope.sel.sel_dialog_rows[row].id==selid){
							scope.sel.sel_dialog_rows.splice(row,1);
						}
					}
				}
			})
			if (scope.sel.sel_dialog_id.indexOf(selid) >= 0) {
				element.prop("checked", true);
			} else {
				element.prop("checked", false);
			}
		}
	};
}

function selectdialogOk() {
	return {
		restrict : "ECMA",
		scope : true,
		link : function(scope, element, attrs) {
			element.on("click", function(e) {
				var item = new Object();
				item.id = scope.sel.sel_dialog_id;
		/*		item.name = scope.sel.sel_dialog_name;*/
				item.rows = scope.sel.sel_dialog_rows;
				scope.sel.modelInstance.close(item);
			})
		}

	};
}

function selectdialogCancel() {
	return {
		restrict : "ECMA",
		scope : true,
		link : function(scope, element, attrs) {
			element.on("click", function(e) {
				scope.sel.modelInstance.dismiss('cancel');
			})
		}

	};
}

function girdCheckBoxSelection() {
	return {
		restrict : 'A',
		scope : true,
		link : function(scope, element, attrs) {
			// console.log(scope.rows);
			// 列表值key
			var gridRowsKey = attrs.gridSelectionRows ? attrs.gridSelectionRows : 'rows';
			// 列表项对象Key
			var rowKey = attrs.gridSelectionRow ? attrs.gridSelectionRow : 'row';
			// 对象ID
			var gridSelectionId = attrs.gridSelectionId ? attrs.gridSelectionId : 'id';
			//循环列表
			var forEachGrids = function(items, func) {
				angular.forEach(items, func);
			}
			//列表全选
			var gridSelectAll = function(){
				scope.datagrid.selectionIds = [];
				if (scope.datagrid.selectionAll) {
					//选中
					forEachGrids(scope[gridRowsKey],function(data){
						scope.datagrid.selectionIds.push(data[gridSelectionId]);
						data.selected = true;
					});
				} else {
					//取消选中
					forEachGrids(scope[gridRowsKey],function(data){
						data.selected = false;
					});
				}
			}
			//单选
			var gridSelectSingle = function(){
				var selectItem = scope[rowKey];
				var itemId = selectItem[gridSelectionId];
				var idx = scope.datagrid.selectionIds.indexOf(itemId);
				if(selectItem.selected){
					scope.datagrid.selectionIds.push(itemId);
				}else{
					 if (idx > -1) {scope.datagrid.selectionIds.splice(idx, 1);}
				}
				 if(scope.datagrid.selectionIds.length==0){
					 scope.datagrid.selectionAll = false;
				 }
				 if(scope.datagrid.selectionIds.length==scope[gridRowsKey].length){
					 scope.datagrid.selectionAll = true;
				 }
			}
			//绑定change事件
			element.on("change", function(e) {
				if (attrs.gridSelection == 'all') {
					gridSelectAll();
				} else {
					gridSelectSingle();
				}
				scope.$apply();//手动触发脏检查
			});
		}
	};
}

//截取字符串长度
function cut() {
    return function (value, wordwise, max, tail) {
        if (!value) return '';

        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace != -1) {
                value = value.substr(0, lastspace);
            }
        }
        return value + (tail || ' …');
    };
}

/**
 * 
 * Pass all functions into module
 */
angular.module('klxTemplate').directive('pageTitle', pageTitle).directive(
		'sideNavigation', sideNavigation).directive('iboxTools', iboxTools)
		.directive('minimalizaSidebar', minimalizaSidebar).directive(
				'iboxToolsFullScreen', iboxToolsFullScreen).directive(
				"selectdialogCancel", selectdialogCancel).directive(
				"selectdialogOk", selectdialogOk).directive("selectDialog",
				selectDialog).directive("gridSelection", girdCheckBoxSelection)
		.factory("selectDialogFactory", selectDialogFactory).filter('cut',cut);
