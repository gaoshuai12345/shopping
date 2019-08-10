
// var $=require('jquery')需要npm install jquery --save,所以不建议使用


var _nav=require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('./index.css');


var _util=require('util')
var _cart=require('service/cart')
var tpl=require('./index.tpl')

var page={
	init:function(){
		this.$box=$('.cart-box');
		this.bindEvent();
		this.loadCart();
	},
	bindEvent:function(){
		var _this=this;
		this.$box.on('click','.select-one',function(){//单个商品选中或取消
			var $this=$(this)
			let productId=$this.parents('.product-item').data('product-id')
			// console.log($this.is(':checked'))点击后的状态
			if($this.is(':checked')){
				_cart.selectOne({
					productId:productId
				},function(cart){
					_this.loadCart();
				},function(){
					_this.showErrPage()
				})
			}
			else{
				_cart.unselectOne({
					productId:productId
				},function(cart){
					_this.loadCart();
				},function(){
					_this.showErrPage()
				})
			}
		})

		this.$box.on('click','.select-all',function(){//全部商品选中或取消
			var $this=$(this)
			if($this.is(':checked')){
				_cart.selectAll(function(cart){
					_this.loadCart();
				},function(){
					_this.showErrPage()
				})
			}
			else{
				_cart.unselectAll(function(cart){
					_this.loadCart();
				},function(){
					_this.showErrPage()
				})
			}
		})

		this.$box.on('click','.delete-one',function(){//单个商品选中或取消
			var $this=$(this)
			let productId=$this.parents('.product-item').data('product-id')
			if(_util.confirm('确定要删除此宝贝吗?')){
				_cart.deleteOne({
					productId:productId
				},function(cart){
					_this.loadCart();
				},function(){
					_this.showErrPage()
				})
			}
		})
		this.$box.on('click','.remove-select',function(){//单个商品选中或取消
			var $this=$(this)
			if(_util.confirm('确定要删除选中的宝贝吗?')){
				_cart.deleteSelect(function(cart){
					_this.loadCart();
				},function(){
					_this.showErrPage()
				})
			}
		})
		this.$box.on('click','.remove-all',function(){//单个商品选中或取消
			var $this=$(this)
			if(_util.confirm('确定要删除购物车所有宝贝吗?')){
				_cart.deleteAll(function(cart){
					_this.loadCart();
				},function(){
					_this.showErrPage()
				})
			}
		})
		this.$box.on('click','.plus',function(){
			var $this=$(this)
			let productId=$this.parents('.product-item').data('product-id')
			_cart.addCount({
				productId:productId
			},function(cart){
				_this.loadCart();
			},function(){
				_this.showErrPage()
			})
		})
		this.$box.on('click','.minus',function(){
			var $this=$(this)
			let productId=$this.parents('.product-item').data('product-id')
			_cart.reduceCount({
				productId:productId
			},function(cart){
				_this.loadCart();
			},function(){
				_this.showErrPage()
			})
		});
		this.$box.on('click','.btn-submit',function(){
			console.log(_this.cart)
			if(_this.cart&&_this.cart.totalPrice>0){
				window.location.href='./order-confirm.html'
			}
			else{
				_util.showErrMsg('请选择商品后再提交！！');
			}
		})
	},
	loadCart:function(){
		var _this=this;
		this.renderCart()
	},
	renderCart:function(){
		var _this=this;
		_nav.loadCartInfo();//购物车中数据改变，立即刷新顶部导航购物车信息
		_this.$box.html('<div class="loading"></div>');
		_cart.getCart(function(cart){

			_this.cart=cart;//保存购物车信息，用来去结算时的验证

			if(cart.cartList.length){//也可添加notEmpty=!!cart.cartList.length在tpl中判断
				cart.cartList.forEach(item=>{
					if(item.checked){//给选中的商品项加一个背景色区别出来
						item.selected='selected'
					}
					item.productId.image=item.productId.imagePath.split(',')[0]
				})
				var html=_util.hoganRender(tpl,cart)
				_this.$box.html(html)
			}else{
				_this.$box.html('<p class="error">您的购物车中还没有商品，快去选购吧<a href="/" class="btn goHome-btn">去选购</a></p>')
			}
			
		},function(){
			_this.showErrPage()
		})
	},
	showErrPage:function(){
		$('.cart-box').html('<p class="error">获取购物车失败，请重试!!!</p>')
	}
}



$(function(){
	page.init()
})