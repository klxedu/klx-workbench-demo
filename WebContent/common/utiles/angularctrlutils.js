/**
 * 将一个数组添加到对象中，这个对象按照abcd[0].propertyname=propertyvalue的方式添加
 * 
 */
 function addCtrlArray(arraypropname,arrayobj,postcontainer){
	 for( var i = 0 ; i < arrayobj.length; i++ ) {
			var rowObj = arrayobj[i];
			if( angular.isString(rowObj) ) {
				postcontainer[arraypropname+"["+i+"]"]=rowObj;
			}else{
				for( var p in rowObj ){
	                   if( typeof(rowObj[p])!="function"  && p.indexOf("$$hashKey") == -1 ) {
						postcontainer[arraypropname+"["+i+"]."+p] = rowObj[p];
					}
				}				
			}
		}
 }