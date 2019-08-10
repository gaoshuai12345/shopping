
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('./index.css');


var _side=require('pages/common/side')
var _util=require('util')
var _user=require('service/user')



var page={
	init:function(){
		this.bindEvent()
		this.onload()
	},
	onload:function(){
		_side.render('user-update-password')
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
	},
	submit:function(){
		var _this=this
			//获取数据
			var validateData={
				password:$.trim($('[name="password"]').val()),
				newPassword:$.trim($('[name="newPassword"]').val()),
			}
			//验证数据
			var result=this.validate(validateData)
			if(result.status){
				this.formError();//清空前端页面提示的错误信息
				_user.updatePassword(validateData,function(result){
					window.location.href='./result.html?type=updatePassword'
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
		if(!_util.validate(validateData.password,'require')){
			result.msg='密码不能为空';
			return result;
		}
		
		if(!_util.validate(validateData.password,'password')){
			result.msg='密码格式错误';
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
	}
}

$(function(){
	page.init()
})
// module.exports=login.init()