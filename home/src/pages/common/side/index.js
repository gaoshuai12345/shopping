require('./index.css')
var _util=require('util')
var tpl=require('./index.tpl')


var side={
	list:[//数组对象里的name属性主要是用来配合判断哪个item是active状态
		{name:'user-center',desc:'用户中心',href:'./user-center.html'},
		{name:'order-list',desc:'我的订单',href:'./order-list.html'},
		{name:'user-update-password',desc:'修改密码',href:'./user-update-password.html'},
	],
	render:function(name){//name值由要显示时的某个页面调用render函数时传入
		for(var i=0;i<this.list.length;i++){
			if(name==this.list[i].name){
				this.list[i].isActive=true
			}
		}
		var html=_util.hoganRender(tpl,{
			list:this.list
		})
		$('.side').html(html)
	}
}

module.exports=side;