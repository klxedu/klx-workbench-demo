angular.module("ngEchart", [])
.directive("ngEchartBar",function () {
	return {
		restrict:'AE',
		scope:{
			option:'=',
			count: '=',
			el:"@"
		},
		link:function(scope,element,attrs,parent){
			var chart = echarts.init(document.getElementById('echartBar'));
			console.log(scope.option);
			scope.init=function(){
				var option = {
			    color: scope.option.color,
			    tooltip : {
			        show :false
			    },
			    grid: {
			        left: '3%',
			        right: '4%',
			        bottom: '3%',
			        containLabel: true
			    },
			    xAxis : [
			        {
			            type : 'category',
			            data : scope.option.Xdata,
			            axisTick: {
			                alignWithLabel: true
			            }
			        }
			    ],
			    yAxis : [
			        {
			            show:false,
			            type : 'value',
			            max : 100
			           
			        },
			         
			    ],
			    series : [
			        {
			            name:'直接访问',
			            type:'bar',
			            barWidth: '60%',
			            data:scope.option.data,
			            label: {
			                normal: {
			                    show: true,
			                    position: 'top',
			                    formatter : '{c}%'
			                },
			                emphasis:{
			                    show:true
			                }
			            },
			        }
			    ]
			};
				chart.setOption(option);
			};
			
			scope.$watch('count',function(){
				console.log('count',scope.count)
				scope.init();
			})
			
		},
		template:'<div id="echartBar" style="height:233px"></div>',
		replace:true
	}
})