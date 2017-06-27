angular.module('Module.imgJcrop',['ngImgCrop']).controller('imgJcropctrl', function($scope, Upload) {
	$scope.imgCrop = {
		"option" : "",
		"data" : {
			'uploadFile' : {
				'maxSize' : '2MB',
				'accept' : 'image/jpeg,image/png',
				'file' : {},
				'errorFile' : {},
				'imfoMsg' : '提示：请选择类型为jpg和png的图片，大小小于2MB，宽度小于${maxWidth}',
				'errorMsg' : {
					'maxSize' : '警告：选择的图片大小超过2MB，请重新选择',
					'maxWidth':	'警告：选择的图片宽度不能超过${maxWidth}'
				}
			},
			'w_h_ratio' : 2 / 1,
			'crop_w' : [400, 200, 120]
		}
	};
	$scope.doFileUpload = function(file, data) {
		console.log(file);
		console.log(data.selectActualSize);
		console.log($scope.imgCrop.data.crop_w[0]);
	}
});