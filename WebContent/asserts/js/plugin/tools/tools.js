angular.module('tools', [])
.directive("loadMap",function(){
	return {
		restrict:'AE',
		replace:false,
		scope :{
			initBap:"&",
			ak:"="
		},
		link:function(scope,element,attrs){
			 window.initBap=scope.initBap;
			 var head = document.getElementsByTagName('HEAD').item(0);
			 var bdscript = document.createElement("script");
			 bdscript.type = "text/javascript";
			 bdscript.src = 'http://api.map.baidu.com/api?ak=' + scope.ak + '&callback=initBap';
			 head.appendChild(bdscript);
			 
		}
	}
})

.filter("renderSize",function(){
	return function(parameter){
	  	if(null==parameter||parameter==''){
	    	return "0 Bytes";  
	  	}  
	  	var unitArr = new Array("Bytes","KB","MB","GB","TB","PB","EB","ZB","YB");  
	  	var index=0;  
	  
	  	var srcsize = parseFloat(parameter);
	  	var quotient = srcsize;  
	  	while(quotient>1024){  
	    	index +=1;  
	   	quotient=quotient/1024;  
	  	}  
	  	return quotient.toFixed(2)+" "+unitArr[index];
	} 
})
.filter("renderSizeD",function(){
	return function(parameter){
		var fileKb=parseInt(parameter/1024);
		var fileMb=parseInt(parameter/(1024*1024));
		if(fileKb>0&&fileMb>0){
			fileKb=fileKb-(1024*fileMb);
			return fileMb+"Mb"+fileKb+"Kb";
		}
		else if(fileKb>0&&fileMb==0){
			return fileKb+"Kb";
		}
		else if(parameter>0&&fileKb==0){
			return parameter+"Byte"
		}
		else{
			return;
		}
		
	}
})
/*
 * 并返回制动长度的字符串，并认为数字和小写字母占0.5长度
 * 使用：str | strCut:3
 * @parameter需要切的字符串
 * @count需要返回字符串长度
 */
.filter("strCut",function(){
	return function(parameter,count){
		if(!parameter||parameter.length==0){
			return "";
		}
		//先处理需要返回的字符串
		var str=(parameter+"").slice(0,count);
		//判断需要返回字符串中有多少字母和数字
		var lowercase=str.match(/[a-z0-9]/g)?str.match(/[a-z0-9]/g):"";
		var count=parseInt(lowercase.length*0.5+count);
		//返回指定长度字符串
		if(parameter.length<=count){
			return parameter;
		}
		return parameter.slice(0,count)+"...";
	}
})


/*
 * 请补充注释！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
 * 
 * 
 * @tfootInit
 */

.directive("common",function(){
	return{
		restrict: 'A',
		controller:function($scope){
			$scope.a=function(){console.log('123')}
			//节流函数
			_throttle = function(func, wait, options) {
			  var context, args, result;
			  var timeout = null;
			  var previous = 0;
			  if (!options) options = {};
			  var later = function() {
			    previous = options.leading === false ? 0 : $.now();
			    timeout = null;
			    result = func.apply(context, args);
			    if (!timeout) context = args = null;
			  };
			  return function() {
			    var now = $.now();
			    if (!previous && options.leading === false) previous = now;
			    var remaining = wait - (now - previous);
			    context = this;
			    args = arguments;
			    if (remaining <= 0 || remaining > wait) {
			      if (timeout) {
			        clearTimeout(timeout);
			        timeout = null;
			      }
			      previous = now;
			      result = func.apply(context, args);
			      if (!timeout) context = args = null;
			    } else if (!timeout && options.trailing !== false) {
			      timeout = setTimeout(later, remaining);
			    }
			    return result;
			  };
			};
		}
	}
})
.directive("tfootFixed",function(){
	return {
		restrict:'AE',
		replace:false,
		scope:{
			tfootState:"=",
			tfootInit:"&",//当外界改变界面时可自行调用init方法
			tfootControl:"="
		},
		require:"common",
		link:function(scope,element,attr,common){
			var Wheight=$(window).height();
			var elTop="",elWidth="",checkTdW="",tfoot;
			tfoot = scope.tfootControl;
			scope.tfootState=false;//用于处理元素当前是否为定位状态，用于判断是否重新获取元素offset
			scope.tfootInit=function(){
				Wheight=$(window).height();
				elWidth="";checkTdW="";
				footHandleScroll();
				if(!scope.tfootState){
					elTop=element.offset().top;
				}
			}
			scope.tfootInit();
			tfoot.reCalculateScroll = function(){
				scope.tfootState=false;
				element.attr("style","").find("td").attr("style","");
			}
			function footHandleScroll() {
				//获取滚动条滚动距离
				sTop=$(document).scrollTop();
				//初始化获得各元素位置大小
				if(!elWidth||!checkTdW){
					elWidth=element.parent("table").outerWidth();
					checkTdW=$(".font-1").outerWidth();
					
				}
				if(!elTop || !scope.tfootState){
					elTop=element.offset().top;
				}
				//判断元素位置
				if(sTop+Wheight<=elTop){
					scope.tfootState=true;
					element.css({"position":"fixed","bottom":"0px","background":"#fff","z-index":"100","width":elWidth,"box-shadow": "0px -2px 5px #ccc"}).find(".Ribbon").css({"width":elWidth});
					element.find(".check").css({"width":checkTdW});
				}else{
					scope.tfootState=false;
					element.attr("style","").find("td").attr("style","");
				}
			}
			var throttled = _throttle(footHandleScroll, 100);
			$(window).scroll(throttled);
			//点击右侧菜单收起按钮触发
			$("#page-wrapper").on("click",".navbar-minimalize",scope.tfootInit);
			_throttle = function(func, wait, options) {
			  var context, args, result;
			  var timeout = null;
			  var previous = 0;
			  if (!options) options = {};
			  var later = function() {
			    previous = options.leading === false ? 0 : $.now();
			    timeout = null;
			    result = func.apply(context, args);
			    if (!timeout) context = args = null;
			  };
			  return function() {
			    var now = $.now();
			    if (!previous && options.leading === false) previous = now;
			    var remaining = wait - (now - previous);
			    context = this;
			    args = arguments;
			    if (remaining <= 0 || remaining > wait) {
			      if (timeout) {
			        clearTimeout(timeout);
			        timeout = null;
			      }
			      previous = now;
			      result = func.apply(context, args);
			      if (!timeout) context = args = null;
			    } else if (!timeout && options.trailing !== false) {
			      timeout = setTimeout(later, remaining);
			    }
			    return result;
			  };
			};
		}
	}
})

.directive("theadFixed",function(){
	return {
		restrict:'AE',
		replace:false,
		scope:{
//			theadState:"=",
			theadInit:"&"//当外界改变界面时可自行调用init方法
		},
		link:function(scope,element,attr){
			scope.theadState=false;//用于处理元素当前是否为定位状态，用于判断是否重新获取元素offset
			var elTop="",elWidth="";
			//获取当前表格元素并clone一份保存
			var $table=element.parent("table").clone(false);
			//将复制的元素追加到dom中
			element.parent("table").parent().append($table);
			//获取当前复制的元素
			var cloneTable=element.parent("table").siblings("table");
			//将复制元素不需要的部分删除
			cloneTable.find("tbody,tfoot").remove();
			var thArr=element.parent("table").find("thead th");
			scope.theadInit=function(){
				elWidth="";
				headHandleScroll();
				if(!scope.theadState){
					elTop=element.offset().top;
				}
			};
			//将复制元素隐藏
			cloneTable.hide();
			function headHandleScroll() {	
				//获取滚动条滚动距离
				sTop=$(document).scrollTop();
				//初始化获得各元素位置大小
				if(!elWidth){
					elWidth=element.outerWidth();
					$.each(thArr,function(i){
						cloneTable.find("thead th").eq(i).css("width",thArr.eq(i).outerWidth());
					})
				};
				if(!elTop){
					elTop=element.offset().top;
				};
				//判断元素位置
				if(sTop>=elTop){
					scope.theadState=true;
					cloneTable.show().css({"position":"fixed","top":"0px","background":"#fff","z-index":"100","width":elWidth+1,"margin-top":"0","box-shadow": "0px 2px 5px #ccc"}).find("tr").css({"width":elWidth});
				}else{
					scope.theadState=false;
					cloneTable.attr("style","display: none;").find("tr").attr("style","");
				}
			}
			
			var throttled = _throttle(headHandleScroll, 100);
			//滚动条滚动式触发
			$(window).scroll(throttled);
			//点击右侧菜单收起按钮触发
			$("#page-wrapper").on("click",".navbar-minimalize",scope.theadInit);
			_throttle = function(func, wait, options) {
			  var context, args, result;
			  var timeout = null;
			  var previous = 0;
			  if (!options) options = {};
			  var later = function() {
			    previous = options.leading === false ? 0 : $.now();
			    timeout = null;
			    result = func.apply(context, args);
			    if (!timeout) context = args = null;
			  };
			  return function() {
			    var now = $.now();
			    if (!previous && options.leading === false) previous = now;
			    var remaining = wait - (now - previous);
			    context = this;
			    args = arguments;
			    if (remaining <= 0 || remaining > wait) {
			      if (timeout) {
			        clearTimeout(timeout);
			        timeout = null;
			      }
			      previous = now;
			      result = func.apply(context, args);
			      if (!timeout) context = args = null;
			    } else if (!timeout && options.trailing !== false) {
			      timeout = setTimeout(later, remaining);
			    }
			    return result;
			  };
			};
		}
	}
})
//标题自适应剪切
.directive('titleFitCut',['$timeout','$filter',function($timeout,$filter){
	return {
		restrict:'A',
		scope :true,
		link:function(scope,element,attrs){
			$timeout(function(){
				if(attrs.titleFitCut){
					var attrArr = attrs.titleFitCut.split('.');
					var value,display,fontNum,paddingSize,minWidth,actualWidth,fontSize,preIcons,minSize=15;
					if(attrs.titlePreIcon){
						preIcons = angular.fromJson(attrs.titlePreIcon);
					}
					angular.forEach(attrArr,function(data){
						value = value?value[data]:scope[data];
					});
					fontSize= parseInt(element.css("font-size"));
					paddingSize = 16;
					minWidth = fontSize*minSize + paddingSize;//15字+...
					actualWidth = element[0].offsetWidth;
					console.log(actualWidth);
					if(actualWidth-minWidth<paddingSize){
						element.css("min-width",minWidth+ paddingSize + "px");//最小宽度
						fontNum = minWidth/fontSize;
						element.css("width",minWidth+ paddingSize + "px");
					}else{
						fontNum = (actualWidth-paddingSize)/fontSize;
						element.css("width",actualWidth + "px");
					}
					//字体图标逻辑
					var _icon = "";
					if(preIcons && preIcons.length>0){
						fontNum = fontNum-preIcons.length;
						angular.forEach(preIcons,function(elt, i, array) {
							_icon += "<span title='"+elt.title+"' class='"+elt.cls+"' style='color:"+elt.color+"'></span>";
						})
					}
					element.css("text-align","left");
					display = _icon+$filter('strCut')(value,fontNum-1);
					element.attr("title",value);
					if(element.children().length==1){
						element.children().first().html(display);
					}else if(element.children().length>1){
						element.find(".title-fit").html(display);
					}else{
						element.html(display);
					}
				}
			});
		}
	}
}])
.directive('menuNav',function(){
	return {
		restrict: "EA",
		scope: true,
		replace: true,
		controller: function($rootScope,$scope,$state){
			var _parent = $state.$current.parent.data;
			var _current = $state.current;
			var _fromState = $rootScope.$fromState;
			$scope.menuNav = [];
			$scope.menuNav.push({name:'首页',sref:$rootScope.swbConfiguration.indexPage});//首页 需要替换成动态获取方式
			$scope.menuNav.push({name:_parent.menuName,sref:''});//一级菜单
			if(_fromState.data && _current.data.parent && _fromState.data.id == _current.data.parent){
				$scope.menuNav.push({name:_fromState.data.menuName,sref:_fromState.name});//二级菜单
				$scope.menuNav.push({name:_current.data.menuName,sref:_current.name,current:true});//三级菜单
			}else{
				$scope.menuNav.push({name:_current.data.menuName,sref:_current.name,current:true});//二级菜单
			}
		},
		link: function($scope,element,attrs){
		},
		template: function(){
			return  ' <ol class="breadcrumb"><li ng-repeat="menu in menuNav" ng-class="{true:\'active\',false:\'\'}[menu.current]"> '
					+' 	<strong ng-if="menu.current">{{menu.name}}</strong> '
					+' 	<span ng-if="!menu.sref">{{menu.name}}</span> '
					+' 	<a ng-if="menu.sref&&!menu.current" ui-sref="{{menu.sref}}">{{menu.name}}</a> '
					+' </li></ol> ';
		}
	}
})
.directive('tableOperation',function($timeout,$filter){
	return {
		restrict: "EA",
		scope: {
			options : '=',
			row : '='
		},
		replace: true,
		controller: function($scope){
//			var defaultOpts = {
//					"isMore":true,
//					"showModel":"icon/text",
//					"showNum":3,
//					"cols":[{
//						"operate":"add",
//						"operateText":"新增",
//						"operateIcon":"glyphicon glyphicon-plus",
//			            "warning":true,
//            			"warningMsg":"确定要删除选择数据吗？",
			//			"hidden":function(row){
			//				
			//			},
//						"event":function(row){
//							
//						}
//					}]
//			};
			//显示数量 默认3
			$scope.showNum = $scope.options.showNum || 3;
			//是否包含更多 默认是
			$scope.isMore = $scope.options.isMore==undefined?true:$scope.options.isMore;
			//显示形式  图标/文字 默认图标
			$scope.showModel = $scope.options.showModel || 'text';
			$scope.cols = $scope.options.cols;
			//显示操作数组
			$scope.displayCols = [];
			//更多操作数组
			$scope.moreCols = [];
			//点击事件
			$scope.onClickEvent = function(event){
				event($scope.row);
			}
			//重新计算显示操作
			var _displayCols = [];
			angular.forEach($scope.cols,function(elt,i,array){
				if(!elt.isHidden || !elt.isHidden($scope.row)){
					_displayCols.push(elt);
				}
			});
			//获取scope中的实际值
			var _doGetScopeValue = function($scope,k){
				//属性分割并获取最终值对象
				var _v = $scope;
				angular.forEach(k.split(/\[|\]|\./),function(elt, i, array) {
					if(elt && _v){
						if(isNaN(parseInt(elt))){
							_v = _v[elt];
						}else{
							_v = _v[parseInt(elt)];
						}
					}
				})
				return _v;
			}
			var _arrayPush = function(arr,col){
				if(col.operate){
					var langOpt = $.workbench.lang[$.workbench.defaultLang].operate[col.operate];
					if(langOpt){
						col.operateText = langOpt.text || col.operateText;
						col.operateIcon = langOpt.icon || col.operateIcon;
					}else if(!col.operateText || !col.operateIcon){
						throw Error("your define operate '"+col.operate+"' not in workbench lang and not define operateText or operateIcon");
					}
					
				}
				if(!col.isHidden){
					col.isHidden = function(row){
						return false;
					}
				}
				arr.push(col);
			}
			if($scope.isMore && _displayCols.length-$scope.showNum>1){
				for(var i=0;i<$scope.showNum;i++){
					_arrayPush($scope.displayCols, _displayCols[i]);
				}
				for(var i=$scope.showNum;i<_displayCols.length;i++){
					_arrayPush($scope.moreCols, _displayCols[i]);
				}
			}else{
				for(var i=0;i<_displayCols.length;i++){
					_arrayPush($scope.displayCols, _displayCols[i]);
				}
			}
		},
		link: function($scope,element,attrs){
		},
		template: function(){
			return " <div class=\"btn-group manage pull-left\"> " 
			+" 	<span ng-repeat=\"col in displayCols\">" 
			+"  <a ng-if=\"!col.warning&&!col.isHidden(row)\" ng-click=\"onClickEvent(col.event)\" ng-class=\"{'icon':col.operateIcon,false:''}[showModel]\" title=\"{{col.operateText}}\">{{showModel=='icon'?'':col.operateText}}</a>" 
			+" 	<a ng-if=\"col.warning&&!col.isHidden(row)\" confirm=\"{{col.warningMsg}}\" confirm-ok=\"确定\"  confirm-cancel=\"取消\" confirm-title=\"确认\" confirm-settings=\"{size: 'sm'}\" ng-click=\"onClickEvent(col.event)\" ng-class=\"{'icon':col.operateIcon,false:''}[showModel]\" title=\"{{col.operateText}}\">{{showModel=='icon'?'':col.operateText}}</a> "
			+"  </span> "
			+" 	<a title=\"更多\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" ng-if=\"isMore&&moreCols.length>0\"> " 
			+" 			<span ng-class=\"{'icon':'glyphicon glyphicon-cog',false:''}[showModel]\">{{showModel=='icon'?'':'更多'}}</span> " 
			+" 			<span class=\"caret\"></span> " 
			+" 	</a> " 
			+" 	<ul class=\"dropdown-menu dropdown-menu-right\" ng-if=\"isMore&&moreCols.length>0\"> " 
			+"     <li ng-repeat=\"col in moreCols\">"
			+" 		 <a ng-if=\"!col.warning&&!col.isHidden(row)\" ng-click=\"onClickEvent(col.event)\" ng-class=\"{'icon':col.operateIcon,false:''}[showModel]\">{{col.operateText}}</a>"
			+" 		 <a ng-if=\"col.warning&&!col.isHidden(row)\" confirm=\"{{col.warningMsg}}\" confirm-ok=\"确定\"  confirm-cancel=\"取消\" confirm-title=\"确认\" confirm-settings=\"{size: 'sm'}\" ng-click=\"onClickEvent(col.event)\" ng-class=\"{'icon':col.operateIcon,false:''}[showModel]\">{{col.operateText}}</a>"
			+"	   </li> " 
			+" 	</ul> " 
			+" </div> " ;
		}
	};
});