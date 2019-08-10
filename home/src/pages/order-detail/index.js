
// var $=require('jquery')需要npm install jquery --save,所以不建议使用

require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('./index.css');

var _side=require('pages/common/side')
var tpl=require('./index.tpl')
var _util=require('util')
var _order=require('service/order')

var page={
	params:{
		orderNo:_util.getParamsFromUrl('orderNo')|| 1,
	},
	init:function(){
		this.onload();
		this.loadOrder();
		this.bindEvent();
	},
	onload:function(){
		_side.render('order-list')//使侧边栏订单列表一项为选中状态
	},
	bindEvent:function(){
		var _this=this;
		$('.order-detail-box').on('click','.btn-cancel',function(){
			if(_util.confirm('确定要取消该订单吗')){
				_order.orderCancel(_this.params,function(order){
					_this.render(order)
				},function(msg){
					$('.order-detail-box').html('<p class="error">取消订单失败</p>')
				})	
			}
		
		})
	},
	loadOrder:function(){
		var _this=this;
		_order.getOrderDetail({orderNo:this.params.orderNo},function(order){
			_this.render(order)
		},function(msg){
			$('.order-detail-box').html('<p class="error">获取订单详情失败</p>')
		})

	},
	render:function(order){
		if(order.productList){
			order.productList.forEach(product=>{
				product.image=product.images.split(',')[0]
			 })	
			order.createdTime=new Date(order.createdAt).toLocaleString();//时间本地化
			var html=_util.hoganRender(tpl,{
				order:order,
				needPay:order.status==10
			})
			$('.order-detail-box').html(html);
		}
		else{
			$('.order-detail-box').html('<p class="error">您的订单去火星了！</p>')
		}					
	}
}

$(function(){
	page.init()
})