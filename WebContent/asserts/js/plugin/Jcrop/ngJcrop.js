angular.module('ngimgJcrop', [''])
.directive("jcrop",function(){
	return {
		restirct : "AE",
		replace : false,
		scope : {
			option : "=",  //选项
			data : "=",    //选区及图片值
			setImage : "&",//用于修改图像地址
			selectChange : "&",//用于返回选区及图片信息
			fileInit : "&",
			fileUoloadFun : "&"
		},
		link : function(scope,element,atts,ctrl){
			//图片剪切
			var jcrop_api;
			var previewW=element.find(".img-content").width();
			var previewH=element.find(".img-content").height();
			
			scope.option.onChange=showCoords;
			scope.option.onSelect=showCoords;
			scope.option.aspectRatio=previewW/previewH;
			
			element.find(".imgCrop").Jcrop(
				scope.option,function(){
					jcrop_api = this;
					var bounds = this.getBounds();
		     		boundx = bounds[0];
		      		boundy = bounds[1];
				}
			);
			
			function showCoords(e){
				var rx = previewW / e.w;
		        var ry = previewH / e.h;
				element.find(".img-content img").css({
					width: Math.round(rx * boundx) + 'px',
		         	height: Math.round(ry * boundy) + 'px',
		          	marginLeft: '-' + Math.round(rx * e.x) + 'px',
		          	marginTop: '-' + Math.round(ry * e.y) + 'px'
				})
			}
			scope.selectChange=function(){
				return {
					"selectActualSize" : jcrop_api.tellSelect(),
					"selectdisplaySize" : jcrop_api.tellScaled(),
					"imgActualSize" : jcrop_api.getBounds(),
					"imgdisplaySize" : jcrop_api.getWidgetSize()
				}
			}
			//文件上传
			scope.fileInit();
			scope.fileUoload=function(file){
				var data=scope.selectChange();
				scope.fileUoloadFun({"file":file,"data":data});
			}

		},
		template :  '<div class="row">'+
					'	<div class="imgcrop-content col-md-8">'+
					'		<img ngf-src="file" class="img-responsive imgCrop"/>'+
					'	</div>'+
					'	<div class="img-content col-md-4">'+
					'		<img ngf-src="file" />'+
					'	</div>'+
					'	<div class="col-sm-2 ">'+
                    '		<div ngf-model-invalid="errorFile"'+
                    '		 ngf-model-invalid ="invalidFile(error)" '+
                    '		 class="btn btn-primary"  ngf-select ng-model="file" name="file" '+
                    '		  >选择文件'+
                    '		</div>'+
                    '	</div>'+
                    '	<div class="col-sm-2">'+
                    '		<button class="btn btn-success" ng-click="fileUoload(file)" ng-disabled="!file.name">确认上传	</button>'+
                    '	</div>'+
					'</div>'
	}
})