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