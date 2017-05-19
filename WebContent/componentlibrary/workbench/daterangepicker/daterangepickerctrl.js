app.controller('daterangepickerctrl',function($scope) {
	var currentDate = moment("2016-12-25 10:10:23","YYYY-MM-DD HH:mm:ss");
	
	$scope.dateRange = {"date1":{},"date2":{"startDate":currentDate,"endDate":currentDate}};
	//日期范围参数对象
	$scope.dataRangeOpts = {
			separator: "~",
			format: "YYYY-MM-DD HH:mm",
			timePicker:true,
			timePicker12Hour:false,
			timeZone:moment().utcOffset()
		};
	
	$scope.saveForm = function(){
		var start = $scope.dateRange.date1.startDate;
		console.log(moment(start));
		console.log(moment(start).format("YYYY-MM-DD HH:mm:ss"));
		console.log(moment(start).format("x"));
		console.log("--------------------------------------------");
	}
	
	$scope.formatDate = function(date,format){
		return moment(date).format(format);
	}
});
