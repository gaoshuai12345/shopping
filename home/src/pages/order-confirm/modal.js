
var _util=require('util')
var modalTpl=require('./modal.tpl')
var _cities=require('util/cities')
var _shipping=require('service/shipping')
var shippingTpl=require('./shipping.tpl')


var _modal={
	show:function(options){
		this.options=options;

		this.$box=$('.modal-box');

		this.renderModal();//渲染modal
		this.bindEvent();
		

	},
	bindEvent:function(){
		var _this=this;
		$('.provinceSelect').on('change',function(){//根据省份渲染城市信息
			_this.getCities(_this.$box.find('.provinceSelect').val())
		})

		//提交
		$('#btn-submit').on('click',function(){
			_this.submit();

		});
		$('input').on('keyup',function(ev){
			if(ev.keyCode==13){
				_this.submit();
			}
		})
	},
	hide:function(){
		this.$box.empty();
	},
	renderModal:function(){
		//有data走编辑操作，无data走新增操作
		var html=_util.hoganRender(modalTpl,{
			shipping:this.options.data||{}
		});
		this.$box.html(html);

		this.getProvinces();//读取省份信息，最好放在modal渲染完成之后
	},
	getProvinces:function(){
		var htmlProvince='<option value="">请选择</option>';
		var provinces=_cities.loadProvinces();
		var $provinceSelect=this.$box.find('.provinceSelect')
		for(var i=0;i<provinces.length;i++){
			htmlProvince+='<option value="'+provinces[i]+'">'+provinces[i]+'</option>';
		}
		$provinceSelect.html(htmlProvince);

		//省份的回填
		if(this.options.data&&this.options.data.province){
			$provinceSelect.val(this.options.data.province);
			this.getCities(this.options.data.province)//执行此步操作，因为如果需要更换其他城市就需要有其他的城市可供选择
		}
	},
	getCities:function(provinceName){
		var htmlCity='<option value="">请选择</option>';
		var cities=_cities.loadCities(provinceName);
		for(var i=0;i<cities.length;i++){
			htmlCity+='<option value="'+cities[i]+'">'+cities[i]+'</option>';
		}
		$('.citySelect').html(htmlCity)


		//城市的回填
		if(this.options.data&&this.options.data.province){
			$('.citySelect').val(this.options.data.city);
		}
	},
	submit:function(){
		var _this=this
			//获取数据
			var validateData={
				name:$.trim($('[name="name"]').val()),
				province:$.trim($('[name="province"]').val()),
				city:$.trim($('[name="city"]').val()),
				address:$.trim($('[name="address"]').val()),
				phone:$.trim($('[name="phone"]').val()),
				zip:$.trim($('[name="zip"]').val())
			}
			//验证数据
			var result=this.validate(validateData)
			if(result.status){
				this.formError();//清空前端页面提示的错误信息
				if(_this.options.data){
					validateData.id=_this.options.data._id
					_shipping.editShipping(validateData,function(shippings){
						_this.options.success(shippings);           //success是包含index.js中函数的对象key值
						_util.showSuccessMsg('编辑地址成功')
						_this.hide()
					},function(){
						_util.showErrMsg('编辑地址错误，请检查信息后重试')
					})
				}
				else{
					_shipping.addShipping(validateData,function(shippings){
						_this.options.success(shippings);           //success是包含index.js中函数的对象key值
						_util.showSuccessMsg('新增地址成功')
						_this.hide()
					},function(){
						_util.showErrMsg('新建地址错误，请检查信息后重试')
					})
				}
				
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
		if(!_util.validate(validateData.name,'require')){
			 result.msg='收件人姓名不能为空';
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
		if(!_util.validate(validateData.province,'require')){
			 result.msg='请选择省份';
			 return result;
		}
		if(!_util.validate(validateData.city,'require')){
			 result.msg='请选择城市';
			 return result;
		}
		if(!_util.validate(validateData.address,'require')){
			result.msg='详细地址不能为空';
			return result;
		}
		result.status=true;
		return result;
	},
	formError:function(msg){
		if(msg){
			$('.errorMsg')
			.show()
			.find('.error-msg')
			.text(msg)
		}
		else{
			$('.errorMsg')
			.hide()
			.find('.error-msg')
			.text('')
		}
	}
}

module.exports=_modal;