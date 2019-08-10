var _util=require('util')

var _product={
	addCart:function(data,success,error){
		_util.request({
			method:"post",
			data:data,
			url:'/cart',
			success:success,
			error:error
		})
	},
	getCart:function(success,error){
		_util.request({
			url:'/cart',
			success:success,
			error:error
		})
	},
	selectOne:function(data,success,error){
		_util.request({
			method:"put",
			data:data,
			url:'/cart/selectOne',
			success:success,
			error:error
		})
	},
	unselectOne:function(data,success,error){
		_util.request({
			method:"put",
			data:data,
			url:'/cart/unselectOne',
			success:success,
			error:error
		})
	},
	selectAll:function(success,error){
		_util.request({
			method:"put",
			url:'/cart/selectAll',
			success:success,
			error:error
		})
	},
	unselectAll:function(success,error){
		_util.request({
			method:"put",
			url:'/cart/unselectAll',
			success:success,
			error:error
		})
	},
	deleteOne:function(data,success,error){
		_util.request({
			method:"put",
			data:data,
			url:'/cart/deleteOne',
			success:success,
			error:error
		})
	},
	deleteSelect:function(success,error){
		_util.request({
			method:"put",
			url:'/cart/deleteSelect',
			success:success,
			error:error
		})
	},
	deleteAll:function(success,error){
		_util.request({
			method:"put",
			url:'/cart/deleteAll',
			success:success,
			error:error
		})
	},
	addCount:function(data,success,error){
		_util.request({
			method:"put",
			data:data,
			url:'/cart/addCount',
			success:success,
			error:error
		})
	},
	reduceCount:function(data,success,error){
		_util.request({
			method:"put",
			data:data,
			url:'/cart/reduceCount',
			success:success,
			error:error
		})
	},
	getCartNum:function(success,error){//获取购物车商品的数量填充到顶部导航中
		_util.request({
			url:'/cart/num',
			success:success,
			error:error
		})
	}
}

module.exports=_product