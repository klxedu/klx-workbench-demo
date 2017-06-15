angular.module('ngimgJcrop', [ 'ngFileUpload' ])
	.directive("jcrop", function() {
		return {
			restirct : "AE",
			replace : false,
			scope : {
				option : "=", //裁剪选项
				data : "=", //选区及图片值
				selectChange : "&", //用于返回选区及图片信息
				doFileUpload : "&"
			},
			controller : function($scope, Upload) {
				console.log('controller init');
				$scope.uploadFile = {
					'maxSize' : '2MB',
					'pattern' : '.png,.jpg',
					'file' : {},
					'invalidFile' : function(err) {
						console.log("-----" + err)
					},
					'imfoMsg':'提示：请选择大小小于2MB的图片，格式为：.jpg和.png'
				};
				if($scope.data&&$scope.data.uploadFile){
					$scope.uploadFile = data.uploadFile;
				}
			},
			link : function($scope, element, atts, ctrl) {
				console.log('link init');
				//图片剪切
				if (!$scope.option) {
					$scope.option = {};
				}
				if (!$scope.data) {
					$scope.data = {};
				}
				$scope.data['w_h_ratio'] = 7 / 4;
				$scope.data['crop_w'] = [ 400, 200, 120 ];

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
				+ '  			<label class="col-sm-9"><span class="text-warning">{{uploadFile.imfoMsg}}，</span><span><a class="text-info" ngf-pattern="uploadFile.pattern" ngf-max-size="uploadFile.maxSize" ngf-model-invalid ="uploadFile.invalidFile" ngf-select ng-model="uploadFile.file" name="file" >点击上传</a></span></label>'
				+ '             <label class="col-sm-3 text-right">'
				+ '             <a class="btn btn-sm uploadfile m-l" ng-class="{true:\'btn-info\',false:\'btn-default\'}[!!uploadFile.file.name]" ng-disabled="!uploadFile.file.name" ng-click="fileUpload()">上传</a>'
				+ '             </label>'
				+ '  		</div>'
				+ '  		<div class="col-sm-6 imgcrop-content"> '
				+ '  			<img class="img-responsive imgCrop" ngf-src="uploadFile.file" /> '
				+ '  		</div> '
				+ '  		<div class="col-sm-5"> '
				+ '  			<div class="row img-content" ng-style="preImgStyle.lg"><img class="lg" ngf-src="uploadFile.file"/> </div>'
				+ '  			<div class="row small"> '
				+ '  				<div class="col-sm-6 img-content" ng-if="preImgCls.md" ng-style="preImgStyle.md"> '
				+ '  					<img class="md" ngf-src="uploadFile.file"/> '
				+ '  				</div> '
				+ '  				<div class="col-sm-6 img-content" ng-if="preImgCls.sm" ng-style="preImgStyle.sm"> '
				+ '  					<img class="sm" ngf-src="uploadFile.file"/> '
				+ '  				</div> '
				+ '  			</div> '
				+ '  		</div> '
				+ '  	</div> '
		}
	})