
// var $=require('jquery')需要npm install jquery --save,所以不建议使用


require('node_modules/font-awesome/css/font-awesome.min.css')
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('./index.css');

require('util/pagination');

var _util=require('util')
var _product=require('service/product')
var _cart=require('service/cart')
var tpl=require('./index.tpl')

var page={
	params:{
		productId:_util.getParamsFromUrl('productId') || '',
	},
	init:function(){
		this.bindEvent();
		this.loadProductDetail();
	},
	bindEvent:function(){
		var _this=this;
		$('.detail-box').on('mouseenter','.product-samll-img-item',function(){
			var $this=$(this);
			$this.addClass('active')
			.siblings('.product-samll-img-item').removeClass('active');
			var imgSrc=$this.find('img').attr('src');
			$('.product-main-img').find('img').attr('src',imgSrc);
		})

		$('.detail-box').on('click','.count-btn',function(){
			var $this=$(this);
			var max=_this.stock;//由loadProduct函数中绑定在对象this上的
			var min=1;
			var $input=$('.count-input');
			var count=parseInt($input.val());//val()取出的是字符串
			if($this.hasClass('plus')){	
				$input.val(count>=max?max:count+1)
			}
			else if($this.hasClass('minus')){
				$input.val(count>min?count-1:min)
			}
		})
		//添加购物车
		$('.detail-box').on('click','.cart',function(){
			_cart.addCart({
				productId:_this.params.productId,
				count:parseInt($('.count-input').val())
			},function(result){
				//console.log(result);
				window.location.href='./result.html?type=addCart'
			},function(msg){
				_util.showErrMsg(msg);
			})
		})

	},
	loadProductDetail:function(){
		var _this=this;
		$('.detail-box').html('<div class="loading"></div>');
		_product.loadProductDetail({productId:this.params.productId},function(product){
			product.images=product.imagePath.split(',');
			product.imageFirst=product.images[0];
			_this.stock=product.stock;
			console.log(product)
			var html=_util.hoganRender(tpl,product);
			$('.detail-box').html(html)
			
		},function(msg){
			_util.showErrMsg(msg)
		})

	}
}



$(function(){
	page.init()
})