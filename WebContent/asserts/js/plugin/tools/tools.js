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
			tfootInit:"&"//当外界改变界面时可自行调用init方法
		},
		require:"common",
		link:function(scope,element,attr,common){
			var Wheight=$(window).height();
			var elTop="",elWidth="",checkTdW="";
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
			function footHandleScroll() {
				//获取滚动条滚动距离
				sTop=$(document).scrollTop();
				//初始化获得各元素位置大小
				if(!elWidth||!checkTdW){
					elWidth=element.parent("table").outerWidth();
					checkTdW=$(".font-1").outerWidth();
					
				}
				if(!elTop){
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
			theadState:"=",
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