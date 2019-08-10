require('./index.css')

var _util=require('util');

var tpl=require('./index.tpl');//分号必须加！！！！！！！！！！！！！！！！！！！！！


(function($){
	function Pagination($elem){
		this.$elem=$elem;
		this.bindEvent();
	}

	Pagination.prototype={
		constructor:Pagination,
		render:function(options){
			var pages=Math.ceil(options.total/options.pageSize);
			var pageArr=[];
			// if(pages>1){
			// 	return ;
			// }
			var start=options.current-options.range>1?options.current-options.range:1;
			var end=options.current+options.range<pages?options.current+options.range:pages
			
			pageArr.push({
				name:'上一页',
				value:options.current-1,
				disabled:options.current-1>0?false:true
			})
			for(var i=start;i<=end;i++){
				pageArr.push({
					name:i,
					value:i,
					active:options.current==i?true:false
				})
			}
			pageArr.push({
				name:'下一页',
				value:options.current+1,
				disabled:options.current+1<=pages?false:true
			})

			var html =_util.hoganRender(tpl,{
				pageArr:pageArr,
				current:options.current,
				pages:pages
			});
			$('.pagination-box').html(html)
		},
		bindEvent:function(){
			var _this=this;

			this.$elem.on('click','.page-item',function(){
				if($(this).hasClass('disabled')||$(this).hasClass('active')){//优化
					return;
				}
				_this.$elem.trigger('page-change',[$(this).data('value')])
			})
		}
	}

	$.fn.extend({
		pagination:function(fn,options){//options:分页参数
			return this.each(function(){
				var $this=$(this);
				var pagination=$this.data('pagination');
				if(!pagination){//作用于初始化分页插件
					pagination=new Pagination($this);
					$this.data('pagination',pagination);
				}
				if(typeof pagination[fn]=='function'){//fn代表pagination插件上的方法
					pagination[fn](options)
				}
			})
		}
	})
})(window.jQuery)