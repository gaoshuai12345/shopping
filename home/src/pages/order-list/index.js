
// var $=require('jquery')需要npm install jquery --save,所以不建议使用

require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('./index.css');
require('util/pagination');
var _side=require('pages/common/side')
var tpl=require('./index.tpl')
var _util=require('util')
var _order=require('service/order')

var page={
	listParams:{
		page:_util.getParamsFromUrl('page')|| 1,
	},
	init:function(){
		this.onload();
		this.initPagination();
		this.render();
	},
	initPagination:function(){
		var _this=this;
		$('.pagination-box').pagination();//初始化分页插件
		$('.pagination-box').on('page-change',function(e,value){//注意ev别忘记
			_this.listParams.page=value;
			_this.render()
		})
	},
	onload:function(){
		_side.render('order-list')//使侧边栏订单列表一项为选中状态
	},
	render:function(){
		$('.order-box').html('<div class="loading"></div>');
		_order.getOrders(this.listParams,function(orders){
			if(orders.list){//                 list->分页数据
				var productList=[];
				orders.list.map(item=>{
					item.productList.forEach(product=>{
						product.image=product.images.split(',')[0]
					 	productList.push(product)
					 })
					item.createdTime=new Date(item.createdAt).toLocaleString();//时间本地化
				})	

				var html=_util.hoganRender(tpl,{
					list:orders.list,
					productList:productList
				})
				$('.order-box').html(html);

				$('.pagination-box').pagination('render',{
					current:orders.current,
					pageSize:orders.pageSize,
					total:orders.total,
					range:3//当前页前后需要显示的分页号
				})
			}
			else{
				$('.order-box').html('<p class="error">获取订单列表失败！</p>')
			}
			
		},function(msg){
			$('.order-box').html('<p class="error">您的订单去火星了！</p>')
		})
		
	}
}

$(function(){
	page.init()
})