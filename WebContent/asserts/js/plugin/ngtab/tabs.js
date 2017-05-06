/**
 * The angular tabs module
 * 
 * @author: nerv
 * @version: 0.2.5, 2012-08-25
 */
'use strict';
angular.module('tabs', []).directive('ngTabs', function() {
	return {
		scope : true,
		restrict : 'EAC',
		controller : function($scope) {
			$scope.tabs = {
				index : 0,
				count : 0
			};
			this.headIndex = 0;
			this.bodyIndex = 0;
			this.getTabHeadIndex = function() {
				return $scope.tabs.count = ++this.headIndex;
			};
			this.getTabBodyIndex = function() {
				return ++this.bodyIndex;
			};
		},
		link : function(scope, element, attributes, controller) {
			var tabsContrl = scope[attributes.tabsContrl]||{"tabsHeaderSwitch":true};
			tabsContrl.tabsHeaderSwitch = tabsContrl.tabsHeaderSwitch==undefined?true:tabsContrl.tabsHeaderSwitch;
			//tab header 不可点击切换
			if(!tabsContrl.tabsHeaderSwitch){
				var tabHeads = $(element).find("[ng-tab-head]");
				$.each(tabHeads,function(index,tabHead){
					$(tabHead).unbind("click");
					$(tabHead).addClass("disabled");
				});
			}
			//tab切换  上一步
			tabsContrl.preTab = function(){
				if(scope.tabs.index != 1){
					scope.tabs.index = scope.tabs.index - 1;
				}
			}
			
			//tab切换  下一步
			tabsContrl.nextTab = function(){
				if(scope.tabs.index != scope.tabs.count){
					scope.tabs.index = scope.tabs.index + 1;
				}
			}
			
		}
	};
}).directive(
		'ngTabHead',
		function() {
			return {
				scope : true,
				restrict : 'EAC',
				require : '^ngTabs',
				link : function(scope, element, attributes, controller) {
					var index = controller.getTabHeadIndex();
					var value = attributes.ngTabHead;
					var active = /[-*\/%^=!<>&|]/.test(value) ? scope.$eval(value) : !!value;
					scope.tabs.index = scope.tabs.index || (active ? index : null);
					element.bind('click', function() {
						scope.tabs.index = index;
						scope.$$phase || scope.$apply();
					});
					scope.$watch('tabs.index', function() {
						element.toggleClass('active',scope.tabs.index === index);
					});
				}
			};
		}).directive(
		'ngTabBody',
		function() {
			return {
				scope : false,
				restrict : 'EAC',
				require : '^ngTabs',
				link : function(scope, element, attributes, controller) {
					var index = controller.getTabBodyIndex();
					scope.$watch('tabs.index', function() {
						element.toggleClass(attributes.ngTabBody + ' ng-show', scope.tabs.index === index);
					});
				}
			};
		});
