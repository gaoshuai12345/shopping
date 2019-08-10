
require('pages/common/logo')
require('pages/common/footer')
require('./index.css');


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
		$('input').on('keyup',function(ev){
			if(ev.keyCode==13){
				_this.submit();
			}
		})
		//检查用户名是否已被注册
		$('[name="username"]').on('blur',function(){
			if(_util.validate($(this).val(),'username')){
				_this.checkUsername($(this).val())
			}
		})
	},
	submit:function(){
		var _this=this
			//获取数据
			var validateData={
				username:$.trim($('[name="username"]').val()),
				password:$.trim($('[name="password"]').val()),
				repassword:$.trim($('[name="repassword"]').val()),
				phone:$.trim($('[name="phone"]').val()),
				email:$.trim($('[name="email"]').val()),
			}
			//验证数据
			var result=this.validate(validateData)
			if(result.status){
				this.formError();//清空前端页面提示的错误信息
				_user.register(validateData,function(result){
					window.location.href='./result.html?type=register'
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
		if(!_util.validate(validateData.username,'username')){
			result.msg='用户名格式错误';
			return result;
		}
		if(!_util.validate(validateData.password,'require')){
			result.msg='密码不能为空';
			return result;
		}
		
		if(!_util.validate(validateData.password,'password')){
			result.msg='密码格式错误';
			return result;
		}
		if(validateData.password!=validateData.repassword){
			result.msg='两次密码不一致';
			return result;
		}
		if(!_util.validate(validateData.phone,'require')){
			result.msg='手机号不能为空';
			return result;
		}
		if(!_util.validate(validateData.phone,'phone')){
			result.msg='手机号格式错误';
			return result;
		}
		if(!_util.validate(validateData.email,'require')){
			result.msg='邮箱不能为空';
			return result;
		}
		if(!_util.validate(validateData.email,'email')){
			result.msg='邮箱格式错误';
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
			.text('')
		}
	},
	checkUsername:function(username){
		var _this=this;
		_user.checkUsername(username,function(result){
			_this.formError()
		},function(result){
			_this.formError(result)
		})
	}
}

$(function(){
	page.init()
})
// module.exports=login.init()