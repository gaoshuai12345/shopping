
// var $=require('jquery')需要npm install jquery --save,所以不建议使用


require('node_modules/font-awesome/css/font-awesome.min.css')
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('./index.css');

require('util/pagination');

var _util=require('util')
var _product=require('service/product')
var tpl=require('./index.tpl')

var page={
	listParams:{
		keyword:_util.getParamsFromUrl('keyword')|| '' ,
		categoryId:_util.getParamsFromUrl('categoryId') || '',
		page:_util.getParamsFromUrl('page')|| 1,
		orderBy:'default'
	},
	init:function(){
		this.initPagination();
		this.bindEvent();
		this.loadProduct();
	},
	initPagination:function(){
		var _this=this;
		$('.pagination-box').pagination();//初始化分页插件
		$('.pagination-box').on('page-change',function(e,value){//注意ev别忘记
			_this.listParams.page=value;
			_this.loadProduct()
		})
	},
	bindEvent:function(){
		var _this=this;
		$('.sort-item').on('click',function(){
			var $this=$(this);
			if($this.hasClass('default')){
				if($this.hasClass('active')){
					return;
				}
				$this.addClass('active')
				.siblings('.sort-item')
				.removeClass('active');
				_this.listParams.orderBy='default';
			}
			else if($this.hasClass('price')){
				$this.addClass('active')
				.siblings('.sort-item')
				.removeClass('active');

				if($this.hasClass('desc')){
					$this.addClass('asc')
					.removeClass('desc');
					_this.listParams.orderBy='price_asc';
				}else{
					$this.addClass('desc')
					.removeClass('asc');
					_this.listParams.orderBy='price_desc';
				}
			}
			_this.listParams.page=1
			_this.loadProduct();
		})

	},
	loadProduct:function(){
		this.listParams.keyword //delete 用法
		?(delete this.listParams.categoryId)
		:(delete this.listParams.keyword)

		//loading图片
		$('.product-box').html('<div class="loading"></div>');

		_product.loadProduct(this.listParams,function(result){
			//因为商品列表只需要显示商品的第一个图片
			var list=result.list.map(function(product){
				product.imageFirst=product.imagePath.split(',')[0]
				return product;
			})
			var html=_util.hoganRender(tpl,{
				list:list
			});
			$('.product-box').html(html);
			$('.pagination-box').pagination('render',{
				current:result.current,
				pageSize:result.pageSize,
				total:result.total,
				range:3//当前页前后需要显示的分页号
			})
		},function(result){

		})
	}

}



$(function(){
	page.init()
})