/**
 * 获取存在的模块<br>
 * <pre>
 * 使用场景：引用的模块中有可能需要动态引用的模块
 * 注意事项：如果明确引用模块组是明确存在的，不建议使用该方法
 * </pre>
 * 
 * @param moduleArr 模块数组 ['module1','module2',...]
 * @returns 在系统中存在的模块数组 ['module1','module2']
 */
function getExistModule(moduleArr) {
	var existModuleArr = [];
	angular.forEach(moduleArr, function(moduleName) {
		try {
			if (angular.module(moduleName))
				existModuleArr.push(moduleName);
		} catch (e) {
			console.log(moduleName
					+ " module is not exist in current sys,errorStack is <br>"
					+ e.stack);
		}
	});
	return existModuleArr;
}