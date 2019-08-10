
// var $=require('jquery')需要npm install jquery --save,所以不建议使用

require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('./index.css');

var _side=require('pages/common/side')
var tpl=require('./index.tpl')
var _util=require('util')
var _user=require('service/user')

var page={
	init:function(){
		this.onload();
		this.render()
	},
	onload:function(){
		_side.render('user-center')
	},
	render:function(){
		$('.content').html('<div class="loading"></div>');
		_user.getUserInfo(function(userInfo){
			var html=_util.hoganRender(tpl,userInfo)
			$('.content').html(html)
		})
		
	}
}

$(function(){
	page.init()
})