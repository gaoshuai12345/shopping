var _util=require('util')

var _shipping={
	addShipping:function(data,success,error){
		_util.request({
			method:"post",
			data:data,
			url:'/shipping',
			success:success,
			error:error
		})
	},
	getShippings:function(success,error){
		_util.request({
			url:'/shipping/list',
			success:success,
			error:error
		})
	},
	getShipping:function(data,success,error){//用于编辑时的数据回填
		_util.request({
			data:data,
			url:'/shipping',
			success:success,
			error:error
		})
	},
	deleteShipping:function(data,success,error){
		_util.request({
			data:data,
			method:'put',
			url:'/shipping/delete',
			success:success,
			error:error
		})
	},
	editShipping:function(data,success,error){
		_util.request({
			data:data,
			method:'put',
			url:'/shipping/edit',
			success:success,
			error:error
		})
	},
}

module.exports=_shipping