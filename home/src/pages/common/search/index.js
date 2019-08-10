require('./index.css')

var _util=require('util')


var search={
	init:function(){
		this.bindEvent()
		this.onload()//初始化一个页面时若有关键字则回填至搜索框内
	},
	onload:function(){
		var keyword =_util.getParamsFromUrl('keyword');
		if(keyword){
			$('#search-input').val(keyword)
		}
	},
	bindEvent:function(){
		var _this=this;
		$('#btn-search').on('click',function(){
			_this.submit();
		});
		//回车键提交
		$('#search-input').on('keyup',function(ev){
			if(ev.keyCode==13){
				_this.submit();
			}
		})
	},
	submit:function(){
		var keyword=$.trim($('#search-input').val());
		// if(keyword){
			window.location.href='./list.html?keyword='+keyword
		// }
		// else{
		// 	_util.goHome();
		// }
	}
	
}

$(function(){
	search.init()
})