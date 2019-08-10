

require('pages/common/logo')
require('pages/common/footer')
require('./index.css')


var _util=require('util')
var _user=require('service/user')



var page={
	init:function(){
		this.bindEvent()
	},
	bindEvent:function(){
		var _this=this;
		$('#btn-submit').on('click',function(){
			_this.submit();
		});
		//回车键提交
		$('input').on('keyup',function(ev){
			if(ev.keyCode==13){
				_this.submit();
			}
		})
	},
	submit:function(){
		var _this=this;
			//获取数据
			var validateData={
				username:$.trim($('[name="username"]').val()),
				password:$.trim($('[name="password"]').val())
			}
			//验证数据
			var result=this.validate(validateData)
			if(result.status){
				this.formError()
				_user.login(validateData,function(result){
					var url =_util.getParamsFromUrl('redirect')//若未登录，点击某些按钮会跳转至登陆页面，url则是用户点击按钮想要跳转页面的路由
					window.location.href=url||'/'
				},function(result){	
					_this.formError(result)
				});
			}
			else{
				this.formError(result.msg)
			}
	},
	validate:function(validateData){
		var result={
			status:false,
			msg:''
		}
		//验证用户名不能为空
		if(!_util.validate(validateData.username,'require')){
			 result.msg='用户名不能为空';
			 return result;
		}
		if(!_util.validate(validateData.password,'require')){
			result.msg='密码不能为空';
			return result;
		}


		result.status=true;
		return result;
	},
	formError:function(msg){
		if(msg){
			$('.error')
			.show()
			.find('.error-msg')
			.text(msg)
		}
		else{
			$('.error')
			.hide()
			.find('.error-msg')
			.text(msg)
		}
	}
}

$(function(){
	page.init()
})
// module.exports=login.init()