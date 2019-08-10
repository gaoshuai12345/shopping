var _util=require('util')

var _product={
	loadProduct:function(data,success,error){
		_util.request({
			method:"get",
			data:data,
			url:'/product/loadProduct',
			success:success,
			error:error
		})
	},
	loadProductDetail:function(data,success,error){
		_util.request({
			data:data,
			url:'/product/loadProductDetail',
			success:success,
			error:error
		})
	},
}

module.exports=_product