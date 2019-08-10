

require('node_modules/font-awesome/css/font-awesome.min.css')
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('./index.css');



var _util=require('util')
var _modal=require('./modal.js')
var _order=require('service/order')
var _shipping=require('service/shipping')
var shippingTpl=require('./shipping.tpl')
var productTpl=require('./product.tpl')

var page={
	data:{//用于选中一个地址，然后编辑或删除其他地址不改变原来选中的状态
		    //也用于提交订单时验证是否选择了地址
		shippingId:null
	},
	init:function(){
		this.bindEvent();
		this.loadShippingList();
		this.loadProductList();
	},
	bindEvent:function(){
		var _this=this;
		var $shippingBox=$('.shipping-box')
		//添加地址
		$shippingBox.on('click','.shipping-add',function(){
			_modal.show({
				success:function(shippings){
					_this.renderShippingList(shippings)
				}
			});
		})
		//编辑地址时先获取信息回填
		$shippingBox.on('click','.shipping-edit',function(ev){
			ev.stopPropagation();
			var shippingId=$(this).parents('.shipping-item').data('shipping-id');
			_shipping.getShipping({
				shippingId:shippingId
			},function(shipping){
				_modal.show({
					success:function(shippings){
						_this.renderShippingList(shippings)
					},
					data:shipping
				});
			},function(msg){
				_util.showErrMsg(msg)
			})
			
		})
		//删除地址
		$shippingBox.on('click','.shipping-delete',function(ev){
			ev.stopPropagation();
			var shippingId=$(this).parents('.shipping-item').data('shipping-id');
			if(_util.confirm('确定要删除该条地址信息吗')){
				_shipping.deleteShipping({
					shippingId:shippingId
				},function(shippings){
					_this.renderShippingList(shippings)
				},function(msg){
					_util.showErrMsg(msg)
				})
				
			}
			
		})
		//选择收货地址
		$shippingBox.on('click','.shipping-item',function(){
			
			$(this).addClass('active')
			.siblings('.shipping-item')
			.removeClass('active')

			_this.data.shippingId=$(this).data('shipping-id')
		})
		//关闭modal
		$('.modal-box').on('click','.close-icon',function(){
			_modal.hide();
		})
		$('.modal-box').on('click',function(){
			_modal.hide();
		})
		$('.modal-box').on('click','.modal-container',function(ev){
			ev.stopPropagation()
		})


		//提交订单
		$('.product-box').on('click','.btn-submit',function(){
			if(_this.data.shippingId){
				_order.createOrder({
					shippingId:_this.data.shippingId
				},function(order){
					window.location.href='./payment.html?orderNo='+order.orderNo;
				},function(msg){
					_util.showErrMsg(msg)
				})
			}
			else{
				console.log('333')
				_util.showErrMsg('请选择地址后再提交')
			}
		})
	},
	loadShippingList:function(){
		var _this=this;
		$('.shipping-box').html('<div class="loading"></div>');
		_shipping.getShippings(function(shippings){
			_this.renderShippingList(shippings);
		},function(){
			$('.shipping-box').html('<p class="error">获取收货地址失败</p>')
		});
	},
	renderShippingList:function(shippings){
		var _this=this;
		shippings.forEach(function(shipping){
			if(shipping._id==_this.data.shippingId){
				shipping.isActive=true;
			}
		})
		var html=_util.hoganRender(shippingTpl,{
			shippings:shippings
		});
		$('.shipping-box').html(html)
	},
	loadProductList:function(){
		var _this=this;
		$('.product-box').html('<div class="loading"></div>');
		_order.getOrderProductList(function(cart){
			_this.cart=cart;//保存购物车信息，用来去结算时的验证
			if(cart.cartList.length){
				cart.cartList.forEach(item=>{
					console.log(item)
					if(item.checked){//给选中的商品项加一个背景色区别出来
						item.selected='selected'
					}
					item.productId.image=item.productId.imagePath.split(',')[0]
				})
				var html=_util.hoganRender(productTpl,cart);
				$('.product-box').html(html)
			}else{
				$('.product-box').html('<p class="error">没有选择需要购买的商品<a href="/" class="btn goCart-btn">去选择</a></p>')
			}
		},function(){
			$('.product-box').html('<p class="error">未获取到相关商品信息</p>')
		})
	}
}



$(function(){
	page.init()
})