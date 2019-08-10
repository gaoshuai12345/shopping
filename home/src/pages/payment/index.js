
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('./index.css');


var _util=require('util')
var _user=require('service/user')
var tpl=require('./index.tpl')
var _payment=require('service/payment')

var page={
	params:{
		orderNo:_util.getParamsFromUrl('orderNo') || ''
	},
	init:function(){
		this.bindEvent();
		this.loadPaymentQr();
	},
	bindEvent:function(){
		var _this=this;
		$('.payment-box').on('click','.qr',function(){
			_payment.changePaymentStatus(_this.params,function(result){
					console.log('更改支付状态为已支付成功')
			},function(){
				_util.showErrMsg('更改支付状态失败');
			})
		})
	},
	loadPaymentQr:function(){
		console.log('11')
		var _this=this;
		_payment.getPaymentQr(this.params,function(qr){
			if(qr){
				_this.renderPaymentQr(qr)
			}
			else{
				$('.payment-box').html('<p class="error">获取支付二维码失败！</p>')
			}
		},function(msg){
			_util.showErrMsg(msg);
		})
	},
	renderPaymentQr:function(qr){
		var _this=this;
		var html=_util.hoganRender(tpl,{
			qr:qr,
			orderNo:this.params.orderNo
		});
		$('.payment-box').html(html)
		window.setInterval(function(){
			_payment.getPaymentStatus(_this.params,function(res){
				if(res){
					window.location.href='./result.html?type=payment&orderNo='+_this.params.orderNo
				}
			},function(msg){
				_util.showErrMsg('获取订单支付状态失败！')
			})
		},3000)
	}
}

$(function(){
	page.init()
})