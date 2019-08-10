var _util=require('util')

var _payment={
	getPaymentQr:function(data,success,error){
		_util.request({
			url:'/payment',
			data:data,
			success:success,
			error:error
		})
	},
	changePaymentStatus:function(data,success,error){
		_util.request({
			url:'/payment/changePaymentStatus',
			method:'put',
			data:data,
			success:success,
			error:error
		})
	},
	getPaymentStatus:function(data,success,error){
		_util.request({
			url:'/payment/getPaymentStatus',
			data:data,
			success:success,
			error:error
		})
	},
}

module.exports=_payment