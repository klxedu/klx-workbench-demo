//指定了要提交的form
function pagehandle(formid,page){
	//设置隐藏域中的值
	var currentPage = document.getElementById("currentPage");
	if(currentPage!=undefined){
		currentPage=page;
	}
	if(formid!=undefined){
		document.forms[formid].submit();
	}else{
		console.log("formid is undefined!");
	}
}
//未指定具体的form，默认提交第一个表单
function pagehandle(page){
	//设置隐藏域中的值
	var currentPage = document.getElementById("currentPage");
	if(currentPage!=undefined){
		currentPage.value=page;
	}
	document.forms[0].submit();
}