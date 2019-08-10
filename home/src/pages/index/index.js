
// var $=require('jquery')需要npm install jquery --save,所以不建议使用


require('node_modules/font-awesome/css/font-awesome.min.css')
require('pages/common/nav')
require('pages/common/footer')
require('pages/common/search')
require('util/carousel')
require('./index.css');


var _util=require('util')
var categoryTpl=require('./categories.tpl')
var carouselTpl=require('./carousel.tpl')
var floorTpl=require('./floor.tpl')


var page={
	categories:[
		{
			item:[{name:'手机'},{name:'iphone'}]
		},
		{
			item:[{name:'女装'},{name:'连衣裙'}]
		},
		{
			item:[{name:'家电'},{name:'空调'}]
		},
		{
			item:[{name:'男装'},{name:'夹克'}]
		},
		{
			item:[{name:'母婴'},{name:'奶粉'}]
		},
		{
			item:[{name:'家具'},{name:'沙发'}]
		},
		{
			item:[{name:'酒水'},{name:'RIO'}]
		},
		{
			item:[{name:'美妆'},{name:'欧莱雅'}]
		},
		{
			item:[{name:'运动'},{name:'耐克'}]
		},
		{
			item:[{name:'汽车'},{name:'红旗'}]
		},
	],
	carousels:[ //图片的地址这样引用的原因是因为模板文件写在.tpl的文件中，webpack并不能对tpl中的jpg进行处理
		{
			categoryId:'1111',img:require('images/carousel/320019.jpg')
		},
		{
			categoryId:'2222',img:require('images/carousel/320020.jpg')
		},
		{
			categoryId:'3333',img:require('images/carousel/320957.jpg')
		}
	],
	floors:[
		{
			title:'F1手机数码',
			floor:[
				{categoryId:'5b850e534af5691fc0f0637f',text:'热门手机',img:require('images/floor/floor1-01.jpg')},
				{categoryId:'5ba04f9c2955f903e466238d',text:'电脑整机',img:require('images/floor/floor1-02.jpg')},
				{categoryId:'5ba04fb22955f903e466238e',text:'摄影摄像',img:require('images/floor/floor1-03.jpg')},
				{categoryId:'5ba04fe62955f903e466238f',text:'办公文教',img:require('images/floor/floor1-04.jpg')},
				{categoryId:'5ba04fff2955f903e4662390',text:'硬件存储',img:require('images/floor/floor1-05.jpg')},
			]
		},
		{
			title:'F2男装/运动',
			floor:[
				{categoryId:'5ba050922955f903e4662398',text:'男士外套',img:require('images/floor/floor2-01.jpg')},
				{categoryId:'5ba0509a2955f903e4662399',text:'男士内搭',img:require('images/floor/floor2-02.jpg')},
				{categoryId:'5ba050a72955f903e466239a',text:'运动服',img:require('images/floor/floor2-03.jpg')},
				{categoryId:'5ba050d92955f903e466239c',text:'特色男装',img:require('images/floor/floor2-05.jpg')},
				{categoryId:'5ba050b32955f903e466239b',text:'运动用品',img:require('images/floor/floor2-04.jpg')},
				
			]
		},
		{
			title:'F3美妆护理',
			floor:[
				{categoryId:'5ba0502f2955f903e4662392',text:'护肤品',img:require('images/floor/floor3-01.jpg')},
				{categoryId:'5ba050342955f903e4662393',text:'彩妆',img:require('images/floor/floor3-02.jpg')},
				{categoryId:'5ba050432955f903e4662394',text:'男士护肤',img:require('images/floor/floor3-03.jpg')},
				{categoryId:'5ba0505c2955f903e4662395',text:'口腔护理',img:require('images/floor/floor3-04.jpg')},
				{categoryId:'5ba050692955f903e4662396',text:'美发护发',img:require('images/floor/floor3-05.jpg')},
			]
		},
		
		{
			title:'F4生鲜水果',
			floor:[
				{categoryId:'5ba051b82955f903e466239f',text:'新鲜蔬菜',img:require('images/floor/floor4-01.jpg')},
				{categoryId:'5ba051c72955f903e46623a0',text:'海鲜水产',img:require('images/floor/floor4-02.jpg')},
				{categoryId:'5ba051da2955f903e46623a1',text:'新鲜水果',img:require('images/floor/floor4-03.jpg')},
				{categoryId:'5ba051e62955f903e46623a2',text:'冰淇淋',img:require('images/floor/floor4-04.jpg')},
				{categoryId:'5ba051f42955f903e46623a3',text:'精选干货',img:require('images/floor/floor4-05.jpg')},
			]
		},
		{
			title:'F5家居建材',
			floor:[
				{categoryId:'5b850f9c4af5691fc0f06380',text:'客厅家具',img:require('images/floor/floor5-01.jpg')},
				{categoryId:'5b850faa4af5691fc0f06381',text:'餐厅成套',img:require('images/floor/floor5-02.jpg')},
				{categoryId:'5b850fac4af5691fc0f06382',text:'书房儿童',img:require('images/floor/floor5-03.jpg')},
				{categoryId:'5ba0513d2955f903e466239d',text:'厨房卫浴',img:require('images/floor/floor5-04.jpg')},
				{categoryId:'5ba051562955f903e466239e',text:'灯饰照明',img:require('images/floor/floor5-05.jpg')},
			]
		}
	],
	init:function(){
		this.onload()
	},
	onload:function(){
		this.loadCategories();
		this.loadCarousel();
		this.loadFloors();
	},
	loadCategories:function(){
		var html=_util.hoganRender(categoryTpl,{
			categories:this.categories
		});
		$('.category').html(html)
	},
	loadCarousel:function(){
		$('.carousel').html('<div class="loading"></div>');
		var html=_util.hoganRender(carouselTpl,{
			carousels:this.carousels
		});
		$('.carousel').html(html);
		var result= $('.carousel').unslider({
		 	dots: true,
		 	keys: true,//支持键盘前后键切图

		 });
		 $('.arrow').on('click',function(){
		 	var direction=$(this).hasClass('next')?'next':'prev';
		 	result.data('unslider')[direction]();
		 })
	},
	loadFloors:function(){
		var html=_util.hoganRender(floorTpl,{
			floors:this.floors
		});
		$('.floor-wrap').html(html);
	}
	
}

$(function(){
	page.init()
})