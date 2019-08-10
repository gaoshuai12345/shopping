var hogan=require('hogan.js')//可以生成html模板的包



var _util={
	request:function(params){
		var _this=this;
		$.ajax({
			url:params.url||'',
			method:params.method||'get',
			dataType:params.dataType||'json',
			data:params.data||'',
			success:function(result){
				//请求成功
				if(result.code==0){
					params.success&&params.success(result.data)
				}
				//没有登录
				else if(result.code==10){
					_this.toLogin()
				}
				//请求数据错误
				else  if(result.code==1){
					params.error&&params.error(result.errMessage)
				}
			},
			error:function(err){
				params.error&&params.error(err.statusText)
			}

		})
	},
	toLogin:function(){
		window.location.href='./user-login.html?redirect='+encodeURIComponent(window.location.href)
	},
	goHome:function(){
		window.location.href='/'
	},
	getParamsFromUrl:function(key){
		var query=window.location.search.substr(1);
		// 例如： type=register&aaa=bbb
		         //以正常字母开始或者&开始      以&结束或者以正常字母结束
		var reg=new RegExp('(^|&)'+key+'=([^&]*)(&|$)');
		var result=query.match(reg);   //是一个数组
						//解码   地址栏有些字符串是经过编译的乱码
		return result?decodeURIComponent(result[2]):null;
	},
	validate:function(value,type){
		if(type=='require'){
			return !!value
		}
		if(type=='username'){
			return /^[a-zA-Z0-9]{3,10}$/.test(value)
		}
		if(type=='password'){
			return /^[a-zA-Z0-9]{3,10}$/.test(value)
		}
		if(type=='phone'){
			return /^1[3568]\d{9}$/.test(value)
		}
		if(type=='email'){
			return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value)
		}
	},
	hoganRender:function(tpl,obj){//生成html模板(多用于类似选项卡切换页面的功能)
		var template=hogan.compile(tpl);
		var output=template.render(obj);
		return output;
	},
	showErrMsg:function(msg){
		alert(msg);
	},
	showSuccessMsg:function(msg){
		alert(msg);
	},
	confirm:function(message){
		return window.confirm(message);
	}
}
module.exports=_util