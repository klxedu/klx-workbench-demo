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
				scope.init();
			})
			
		},
		template:'<div id="echartBar" style="height:233px"></div>',
		replace:true
	}
})
.directive('ngEchartPie',function(){
	return{
		restrict:'AE',
		scope:{
			option:'=',
			el:"@",
			events : "&"
		},
		link:function(scope,element,attr){
			var chart = echarts.init(document.getElementById('echartPie'));
			var option = {
			    series: [
			        {
			            name:'访问来源',
			            type:'pie',
			            radius: ['40%', '85%'],
			            avoidLabelOverlap: false,
			            label: {
			                normal: {
			                    show: true,
			                    position: 'inside',
			                    precision : "0",
			                    formatter: function(a){
			                    	return a.name+":"+parseInt(a.percent)+"%";
			                    }
			                },
			                emphasis: {
			                    show: true,
			                    textStyle: {
			                        fontSize: '12'
			                    }
			                }
			            },
			            labelLine: {
			                normal: {
			                    show: false
			                }
			            },
			            data:scope.option.data
			        }
			    ]
			};
			var param=null;
			chart.setOption(option);
			chart.on('click', function (params) {
			    param = params;
			});
			$('body').on('click',function(){
				if(param){
					param.isClickEchart=true;
				}else{
					param={};
					param.type="click";
					param.isClickEchart=false;
				}
				scope.events({eobj:param});
				param=null;
			});
		},
		template:'<div id="echartPie" style="height:233px"></div>',
		replace:true
	}
})