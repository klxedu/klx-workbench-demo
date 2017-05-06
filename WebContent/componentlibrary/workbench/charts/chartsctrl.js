app.controller('chartsctrl',function($scope,chartsservice) {
	var data1 = [
         [gd(2012, 1, 1), 7],
         [gd(2012, 1, 2), 6],
         [gd(2012, 1, 3), 4],
         [gd(2012, 1, 4), 8],
         [gd(2012, 1, 5), 9],
         [gd(2012, 1, 6), 7],
         [gd(2012, 1, 7), 5],
         [gd(2012, 1, 8), 4],
         [gd(2012, 1, 9), 7],
         [gd(2012, 1, 10), 8],
         [gd(2012, 1, 11), 9],
         [gd(2012, 1, 12), 6],
         [gd(2012, 1, 13), 4],
         [gd(2012, 1, 14), 5],
         [gd(2012, 1, 15), 11],
         [gd(2012, 1, 16), 8],
         [gd(2012, 1, 17), 8],
         [gd(2012, 1, 18), 11],
         [gd(2012, 1, 19), 11],
         [gd(2012, 1, 20), 6],
         [gd(2012, 1, 21), 6],
         [gd(2012, 1, 22), 8],
         [gd(2012, 1, 23), 11],
         [gd(2012, 1, 24), 13],
         [gd(2012, 1, 25), 7],
         [gd(2012, 1, 26), 9],
         [gd(2012, 1, 27), 9],
         [gd(2012, 1, 28), 8],
         [gd(2012, 1, 29), 5],
         [gd(2012, 1, 30), 8],
         [gd(2012, 1, 31), 25]
     ];
	var data2 = [
         [gd(2012, 1, 1), 800],
         [gd(2012, 1, 2), 500],
         [gd(2012, 1, 3), 600],
         [gd(2012, 1, 4), 700],
         [gd(2012, 1, 5), 500],
         [gd(2012, 1, 6), 456],
         [gd(2012, 1, 7), 800],
         [gd(2012, 1, 8), 589],
         [gd(2012, 1, 9), 467],
         [gd(2012, 1, 10), 876],
         [gd(2012, 1, 11), 689],
         [gd(2012, 1, 12), 700],
         [gd(2012, 1, 13), 500],
         [gd(2012, 1, 14), 600],
         [gd(2012, 1, 15), 700],
         [gd(2012, 1, 16), 786],
         [gd(2012, 1, 17), 345],
         [gd(2012, 1, 18), 888],
         [gd(2012, 1, 19), 888],
         [gd(2012, 1, 20), 888],
         [gd(2012, 1, 21), 987],
         [gd(2012, 1, 22), 444],
         [gd(2012, 1, 23), 999],
         [gd(2012, 1, 24), 567],
         [gd(2012, 1, 25), 786],
         [gd(2012, 1, 26), 666],
         [gd(2012, 1, 27), 888],
         [gd(2012, 1, 28), 900],
         [gd(2012, 1, 29), 178],
         [gd(2012, 1, 30), 555],
         [gd(2012, 1, 31), 993]
     ];
	var data3 = [
         [gd(2012, 1, 1), 200],
         [gd(2012, 1, 2), 200],
         [gd(2012, 1, 3), 200],
         [gd(2012, 1, 4), 200],
         [gd(2012, 1, 5), 200],
         [gd(2012, 1, 6), 456],
         [gd(2012, 1, 7), 800],
         [gd(2012, 1, 8), 589],
         [gd(2012, 1, 9), 467],
         [gd(2012, 1, 10), 876],
         [gd(2012, 1, 11), 689],
         [gd(2012, 1, 12), 700],
         [gd(2012, 1, 13), 500],
         [gd(2012, 1, 14), 600],
         [gd(2012, 1, 15), 700],
         [gd(2012, 1, 16), 786],
         [gd(2012, 1, 17), 345],
         [gd(2012, 1, 18), 888],
         [gd(2012, 1, 19), 888],
         [gd(2012, 1, 20), 888],
         [gd(2012, 1, 21), 987],
         [gd(2012, 1, 22), 444],
         [gd(2012, 1, 23), 999],
         [gd(2012, 1, 24), 567],
         [gd(2012, 1, 25), 786],
         [gd(2012, 1, 26), 666],
         [gd(2012, 1, 27), 888],
         [gd(2012, 1, 28), 900],
         [gd(2012, 1, 29), 178],
         [gd(2012, 1, 30), 555],
         [gd(2012, 1, 31), 993]
     ];
	 function gd(year, month, day) {
         return new Date(year, month - 1, day).getTime();
     }
	$scope.dataset = [
          {
              label: "课程学习人数",
              grow:{stepMode:"linear"},
              data: data2,
              color: "#1ab394",
              bars: {
                  show: true,
                  align: "center",
                  barWidth: 24 * 60 * 60 * 600,
                  lineWidth: 0
              }

          },
          {
              label: "通过人数",
              grow:{stepMode:"linear"},
              data: data1,
              yaxis: 2,
              color: "#1C84C6",
              lines: {
                  lineWidth: 1,
                  show: true,
                  fill: true,
                  fillColor: {
                      colors: [
                          {
                              opacity: 0.2
                          },
                          {
                              opacity: 0.2
                          }
                      ]
                  }
              }
          }
      ];
	$scope.options = {
            grid: {
                hoverable: true,
                clickable: true,
                tickColor: "#d5d5d5",
                borderWidth: 0,
                color: '#d5d5d5'
            },
            colors: ["#1ab394", "#464f88"],
            tooltip: true,
            xaxis: {
                mode: "time",
                tickSize: [3, "day"],
                tickLength: 0,
                axisLabel: "Date",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Arial',
                axisLabelPadding: 10,
                color: "#d5d5d5"
            },
            yaxes: [
                {
                    position: "left",
                    max: 1070,
                    color: "#d5d5d5",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Arial',
                    axisLabelPadding: 3
                },
                {
                    position: "right",
                    color: "#d5d5d5",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: ' Arial',
                    axisLabelPadding: 67
                }
            ],
            legend: {
                noColumns: 1,
                labelBoxBorderColor: "#d5d5d5",
                position: "nw"
            }

        };
        //年月日点击后选中
		$scope.selectClassName="today";
        $scope.selectClass=function(i){
            $scope.selectClassName=i;
            $scope.dataset[1].data=data3;
        }
       //小统计模板切换年月日
        $scope.showText="今日";
        $scope.showTextClick=function(i){
            $scope.showText=i;
        }

    $scope.labels = ["PC", "微信1", "APP"];
    $scope.data = [300, 500, 100];
    $scope.showData=1;
    //小图标统计模板方法
    $scope.chartClick=function(points,evt,legendItem){
        if(legendItem._index){;
            $scope.showData=legendItem._index;
            $scope.$apply();
        }
    }
    $scope.option={
        animation:{
            responsive: false,
            animateScale:true
        }
    }
    //折线图数据
    $scope.flotChartData= [
        {
            label: "bar",
            data: [
                [1, 34],
                [2, 25],
                [3, 19],
                [4, 34],
                [5, 32],
                [6, 44]
            ]
        }
    ];
    $scope.flotLineOptions={
        series: {
            lines: {
                show: true,
                lineWidth: 2,
                fill: true,
                fillColor: {
                    colors: [
                        {
                            opacity: 0.0
                        },
                        {
                            opacity: 0.0
                        }
                    ]
                }
            }
        },
        xaxis: {
            tickDecimals: 0
        },
        colors: ["#1ab394"],
        grid: {
            color: "#999999",
            hoverable: true,
            clickable: true,
            tickColor: "#D4D4D4",
            borderWidth: 0
        },
        legend: {
            show: false
        },
        tooltip: true,
        tooltipOpts: {
            content: "x: %x, y: %y"
        }
    };
});
