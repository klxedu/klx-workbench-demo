/**
 * 使用方法
 * 1、依赖模块：ngFileUpload、ngImgCrop模块
 * 2、使用指令：jcrop
 * 3、配置参数：option、data
 * 4、<div jcrop option="imgCrop.option"  data="imgCrop.data" do-file-upload="doFileUpload(file,data)"></div>
 * 5、参数说明
 * 5-1、option，JCrop参数配置
 * 5-2、data，图片裁剪参数集合
 * {
 *	"uploadFile":{
 *		"maxSize":"2MB",
 *		"accept":"image/jpeg,image/png",
 *		"file":{
 *		},
 *		"errorFile":{
 *		},
 *		"imfoMsg":"提示：请选择类型为jpg和png的图片，大小小于2MB",
 *		"errorMsg":{
 *			"maxSize":"警告：选择的图片大小超过2MB，请重新选择"
 *		}
 *	},
 *	"w_h_ratio":1.3333333333333333,
 *	"crop_w":[
 *		400,
 *		200,
 *		120
 *	]
 *}
 * 5-3、doFileUpload(file,data),上传回调方法。
 * 
 */
angular.module('ngImgCrop', [ 'ngFileUpload' ]).constant('defaultOption', {}).constant('defaultData', {
	'uploadFile' : {
		'maxSize' : '2MB',
		'accept' : 'image/jpeg,image/png',
		'file' : {},
		'errorFile' : {},
		'imfoMsg' : '提示：请选择类型为jpg和png的图片，大小小于2MB',
		'errorMsg' : {
			'maxSize' : '警告：选择的图片大小超过2MB，请重新选择'
		}
	},
	'w_h_ratio' : 4 / 3,
	'crop_w' : [ 400, 200, 120 ]
})
	.directive("jcrop", function($timeout) {
		return {
			restirct : "AE",
			replace : false,
			scope : {
				option : "=", //裁剪选项
				data : "=", //选区及图片值
				selectChange : "&", //用于返回选区及图片信息
				doFileUpload : "&"
			},
			controller : function($scope, Upload, defaultOption, defaultData) {
				$scope.option = $scope.option || defaultOption;
				$scope.data = $scope.data || defaultData;
				$scope.uploadFile = $scope.data.uploadFile;
			},
			link : function($scope, element, atts, ctrl) {
				var jcrop_api;
				var previewW = $scope.data.crop_w[0];
				var previewH = $scope.data.crop_w[0] / $scope.data.w_h_ratio;

				$scope.preImgCls = {
					'lg' : true,
					'md' : $scope.data.crop_w.length > 1,
					'sm' : $scope.data.crop_w.length > 2
				}
				$scope.preImgStyle = {
					'lg' : {
						'width' : previewW,
						'height' : previewH
					},
					'md' : $scope.preImgCls.md ? {
						'width' : $scope.data.crop_w[1],
						'height' : $scope.data.crop_w[1] / $scope.data.w_h_ratio
					} : '',
					'sm' : $scope.preImgCls.md ? {
						'margin-left' : '15px',
						'width' : $scope.data.crop_w[2],
						'height' : $scope.data.crop_w[2] / $scope.data.w_h_ratio
					} : ''
				};
				$scope.option.onChange = showCoords;
				$scope.option.onSelect = showCoords;
				$scope.option.aspectRatio = $scope.data.w_h_ratio;

				element.find(".imgCrop").Jcrop(
					$scope.option, function() {
						jcrop_api = this;
						var bounds = this.getBounds();
						boundx = bounds[0];
						boundy = bounds[1];
					}
				);

				function showCoords(e) {
					for (i in $scope.preImgCls) {
						var _tag = $scope.preImgCls[i];
						if (_tag) {
							var rx = $scope.preImgStyle[i].width / e.w;
							var ry = $scope.preImgStyle[i].height / e.h;
							var _ele_style = ".img-content ." + i;
							element.find(_ele_style).css({
								width : Math.round(rx * boundx) + 'px',
								height : Math.round(ry * boundy) + 'px',
								marginLeft : '-' + Math.round(rx * e.x) + 'px',
								marginTop : '-' + Math.round(ry * e.y) + 'px'
							});
						}
					}

				}
				$scope.selectChange = function() {
					return {
						"selectActualSize" : jcrop_api.tellSelect(),
						"selectdisplaySize" : jcrop_api.tellScaled(),
						"imgActualSize" : jcrop_api.getBounds(),
						"imgdisplaySize" : jcrop_api.getWidgetSize()
					}
				}
				//文件变化
				$timeout(function(){
					$scope.$watch('uploadFile.file.$ngfBlobUrl', function(newValue, oldValue, scope) {
						if(newValue && element.find('.jcrop-holder img')){
							var _jcropImgs = element.find('.jcrop-holder img');
							if(_jcropImgs.length>0){
								angular.forEach(_jcropImgs,function(elt, i, array) {
									elt.src = newValue;
								})
							}
						}
					});
				});
				//文件上传
				$scope.fileUpload = function() {
					$scope.doFileUpload({
						"file" : $scope.uploadFile.file,
						"data" : $scope.selectChange()
					});
				}
			},
			template : '  	<div class="row imgcropBox"> '
				+ '  		<div class="col-sm-7"> '
				+ '  			<label class="col-sm-9">'
				+ '					<span class="text-warning">{{uploadFile.invalidFile.$error?uploadFile.errorMsg[uploadFile.invalidFile.$error]:uploadFile.imfoMsg}}，</span>'
				+ '					<span><a class="text-info" ngf-model-invalid="uploadFile.invalidFile" accept="{{uploadFile.accept}}" ngf-max-size="uploadFile.maxSize" ngf-select ng-model="uploadFile.file">点击上传</a></span></label>'
				+ '             <label class="col-sm-3 text-right">'
				+ '             <a class="btn btn-sm uploadfile m-l" ng-class="{true:\'btn-info\',false:\'btn-default\'}[!!uploadFile.file.name]" ng-disabled="!uploadFile.file.name" ng-click="fileUpload()">上传</a>'
				+ '             </label>'
				+ '  		</div>'
				+ '  		<div class="col-sm-6 imgcrop-content"> '
				+ '  			<img style="display:none;" ngf-src="uploadFile.file" /> '
				+ '  			<img class="img-responsive imgCrop" ngf-src="uploadFile.file" /> '
				+ '  		</div> '
				+ '  		<div class="col-sm-5"> '
				+ '  			<div class="row img-content" ng-style="preImgStyle.lg"><img class="lg" ng-src="{{uploadFile.file.$ngfBlobUrl}}"/> </div>'
				+ '  			<div class="row small"> '
				+ '  				<div class="col-sm-6 img-content" ng-if="preImgCls.md" ng-style="preImgStyle.md"> '
				+ '  					<img class="md" ng-src="{{uploadFile.file.$ngfBlobUrl}}"/> '
				+ '  				</div> '
				+ '  				<div class="col-sm-6 img-content" ng-if="preImgCls.sm" ng-style="preImgStyle.sm"> '
				+ '  					<img class="sm" ng-src="{{uploadFile.file.$ngfBlobUrl}}"/> '
				+ '  				</div> '
				+ '  			</div> '
				+ '  		</div> '
				+ '  	</div> '
		}
	})