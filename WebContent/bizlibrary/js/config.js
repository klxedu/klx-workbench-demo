/**
 * INSPINIA - Responsive Admin Theme
 * 
 * Inspinia theme use AngularUI Router to manage routing and views Each view are
 * defined as state. Initial there are written state for all view in theme.
 * 
 */
function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider,
	IdleProvider, KeepaliveProvider) {

	// Configure Idle settings
	IdleProvider.idle(5); // in seconds
	IdleProvider.timeout(120); // in seconds

	$urlRouterProvider.otherwise("/index/minor");

	$ocLazyLoadProvider.config({
		// Set to true if you want to see what and when is dynamically loaded
		debug : false
	});

	$stateProvider
		.state('index', {
			abstract : true,
			url : "/index",
			templateUrl : "views/common/content.html",
		})
		.state('index.minor', {
			url : "/minor",
			templateUrl : "views/minor.html"
		})
		.state('approval', {
			abstract : true,
			url : "/approval",
			templateUrl : "views/common/content.html",
		})
		.state(
			'approval.approvalmodel',
			{
				url : "approvalmodel/:data",
				templateUrl : "./workbench/approvalmodel/list.html",
				data : {
					pageTitle : ''
				},
				controller : "approvalmodelctrl",
				resolve : {
					loadPlugin : function($ocLazyLoad) {
						return $ocLazyLoad
							.load([ {
								name : 'Module.approvalmodel',
								files : [
									'../templatelibrary/workbench/StandardList/StandardList.css',
									'./workbench/approvalmodel/approvalmodelService.js',
									'./workbench/approvalmodel/approvalmodelCtrl.js',
									'../asserts/js/plugin/select/select.min.js',
									'../asserts/js/plugin/select/lodash.min.js',
									'../asserts/js/plugin/select/myselect.min.js',
									'../asserts/css/plugins/select/select.min.css',
									'../asserts/css/plugins/select/myselect.css',
									'../asserts/js/plugin/timepicker/bootstrap-datetimepicker.fr.js',
									'../asserts/js/plugin/timepicker/bootstrap-datetimepicker.min.js',
									'../asserts/js/plugin/timepicker/datatime.directive.js',
									'../asserts/css/plugins/timepicker/bootstrap-datetimepicker.min.css',
									'../asserts/css/plugins/angulartreetable/tree-control-attribute.css',
									'../asserts/css/plugins/angulartreetable/tree-control.css',
									'../asserts/js/plugin/angulartreetable/angular-tree-control.js',
									'../asserts/js/plugin/selectTree/select.js',
									'../asserts/js/plugin/tools/tools.js'
								],
								serie : true
							}

							]);
					}
				}
			})
}
angular.module('klxBiz').config(config).run(function($rootScope, $state) {
	$rootScope.$state = $state;
});