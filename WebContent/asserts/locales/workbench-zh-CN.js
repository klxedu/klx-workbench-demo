(function($) {
	$.workbench = {
		'defaultLang' : $("meta[http-equiv='content-language']").attr('content')?$("meta[http-equiv='content-language']").attr('content'):'zh-CN',
		'lang' : {}
	};
	$.extend($.workbench.lang, {
		'zh-CN' : {
			'operate' : {
				'add' : {
					'text' : '新增',
					'icon' : 'glyphicon glyphicon-plus'
				},
				'delete' : {
					'text' : '删除',
					'icon' : 'glyphicon glyphicon-trash'
				},
				'edit' : {
					'text' : '编辑',
					'icon' : 'glyphicon glyphicon-edit'
				},
				'view' : {
					'text' : '查看',
					'icon' : 'glyphicon glyphicon-eye-open'
				},
				'save' : {
					'text' : '保存',
					'icon' : 'glyphicon glyphicon-floppy-saved'
				},
				'search' : {
					'text' : '搜索',
					'icon' : 'glyphicon glyphicon-search'
				},
				'general-search' : {
					'text' : '普通搜索',
					'icon' : 'glyphicon glyphicon-search'
				},
				'advanced-search' : {
					'text' : '高级搜索',
					'icon' : 'glyphicon glyphicon-search'
				},
				'confirm' : {
					'text' : '确定',
					'icon' : 'glyphicon glyphicon-ok-sign'
				},
				'cancel' : {
					'text' : '取消',
					'icon' : 'glyphicon glyphicon-remove-sign'
				},
				'close' : {
					'text' : '关闭',
					'icon' : 'glyphicon glyphicon-remove'
				},
				'publish' : {
					'text' : '发布',
					'icon' : 'glyphicon glyphicon-check'
				},
				'enable' : {
					'text' : '启用',
					'icon' : 'glyphicon glyphicon-ok-circle'
				},
				'disable' : {
					'text' : '停用',
					'icon' : 'glyphicon glyphicon-remove-circle'
				},
				'return' : {
					'text' : '返回',
					'icon' : 'glyphicon glyphicon-arrow-left'
				},
				'preStep' : {
					'text' : '上一步',
					'icon' : 'glyphicon glyphicon-chevron-left'
				},
				'nextStep' : {
					'text' : '下一步',
					'icon' : 'glyphicon glyphicon-chevron-right'
				},
				'expand' : {
					'text' : '展开',
					'icon' : 'glyphicon glyphicon-expand'
				},
				'collapse' : {
					'text' : '收起',
					'icon' : 'glyphicon glyphicon-collapse-down'
				},
				'recall' : {
					'text' : '撤回',
					'icon' : 'glyphicon glyphicon-share-alt'
				},
				'brower' : {
					'text' : '浏览',
					'icon' : 'glyphicon glyphicon-plus'
				},
				'upload' : {
					'text' : '上传',
					'icon' : 'glyphicon glyphicon-cloud-upload'
				},
				'download' : {
					'text' : '下载',
					'icon' : 'glyphicon glyphicon-cloud-download'
				},
				'clearup' : {
					'text' : '清空',
					'icon' : 'glyphicon glyphicon-trash'
				},
				'append' : {
					'text' : '添加',
					'icon' : 'glyphicon glyphicon-plus-sign'
				},
				'lock' : {
					'text' : '锁定',
					'icon' : 'glyphicon glyphicon-lock'
				}
			}
		}
	});
})(jQuery);