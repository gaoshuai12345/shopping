import React,{ Component } from 'react'
import Layout from 'common/layout'
import { Form, Input,Select,Button,InputNumber} from 'antd'

const FormItem = Form.Item;
const Option = Select.Option;

import {connect} from 'react-redux'
import { actionCreators } from './store'
import CategorySelector from './category-selector.js'


import './detail.css'


class NormalProductDetail extends Component{
   constructor(props){
		super(props)
		this.handleSubmit=this.handleSubmit.bind(this)
   }
   componentDidMount(){
   		if(this.props.match.params.productId){
   			this.props.handleProductDetail(this.props.match.params.productId)
   		}
   }
   handleSubmit(e){
	    e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	      	if(this.props.match.params.productId){
	      		values.id=this.props.match.params.productId
	      	}
	      	this.props.handleSave(err,values);
	    });
   }
	render(){
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
	      labelCol: {
	        xs: { span: 24 },
	        sm: { span: 2 },
	      },
	      wrapperCol: {
	        xs: { span: 24 },
	        sm: { span: 22 },
	      },
	    };
	    const tailFormItemLayout = {
	      wrapperCol: {
	        xs: {
	          span: 24,
	          offset: 0,
	        },
	        sm: {
	          span: 16,
	          offset: 8,
	        },
	      },
	    };

		let fileList=[];
		if(this.props.imagePath){
			fileList=this.props.imagePath.split(',').map((img,index)=>(
				<li>
					<img src={img} key={index} />
				</li>
			))
		}
		return(
			<Layout>
			  <div >
				<Form>
					<FormItem
			          {...formItemLayout}
			          label="商品名称"
			        >
			            <Input 
			            	placeholder='商品名称'
			            	disabled={true}
			            	value={this.props.name}
			            />
			        </FormItem>
			        <FormItem
			          {...formItemLayout}
			          label="商品描述"
			        >
			          
			            <Input 
			            	placeholder='商品描述'
			            	disabled={true}
			            	value={this.props.description}
			            />
			         
			        </FormItem>
			        <FormItem
			          {...formItemLayout}
			          label="商品价格"
			        >
			          
			            <InputNumber 
			           		value={this.props.price}
			            	formatter={value => `${value}元`}
			            	parser={value => value.replace('元', '')}
			            	disabled={true}
			            	
			            />
			         
			        </FormItem>
			        <FormItem
			          {...formItemLayout}
			          label="商品库存"
			        >
			          
			            <InputNumber 
			            	formatter={value => `${value}件`}
			            	parser={value => value.replace('件', '')}
			            	disabled={true}
			            	value={this.props.stock}
			            />
			         
			        </FormItem>
			        <FormItem              //自行填写验证规则
			          {...formItemLayout}
			          validateStatus={this.props.categoryId_validateStatus}
			          help={this.props.categoryId_help}
			          label="所属分类"
			        >
				        <CategorySelector                      //注意传递写法 {  }
			          		parentCategoryId={this.props.parentCategoryId}//两个父Id不同，一个是添加商品时传回来用于保存数据的，另一个是编辑商品时传过去用于显示所属分类的
			          		categoryId={this.props.categoryId}   //两个子Id也不同
				         	disabled={true}//为什么true要写在这里传进去呢,因为只有查看detail页面时，需要将所属分类设置disabled,其他的页面引用此插件时都不能设置
				          />
			        </FormItem>
			        <FormItem
			          {...formItemLayout}
			          label="商品图片"
			        >  
			       		<ul className='img-box'>
			        		{fileList}
			        	</ul>
			        </FormItem>
			        <FormItem
			          {...formItemLayout}
			          label="商品详情"       //下边这个很叼
			        >
			        <div dangerouslySetInnerHTML={{__html:this.props.detailValue}}></div>
			        </FormItem>
				</Form>
			  </div>
			</Layout>
		)
	}
}
const mapStateToProps=(state)=>{
	return{
		isAddFetching:state.get('product').get('isAddFetching'),
		categories:state.get('product').get('categories'),
		categoryId_validateStatus:state.get('product').get('categoryId_validateStatus'),
		categoryId_help:state.get('product').get('categoryId_help'),

		name:state.get('product').get('name'),
		description:state.get('product').get('description'),
		price:state.get('product').get('price'),
		stock:state.get('product').get('stock'),
		parentCategoryId:state.get('product').get('parentCategoryId'),
		categoryId:state.get('product').get('categoryId'),
		imagePath:state.get('product').get('imagePath'),
		detailValue:state.get('product').get('detailValue'),
	}
}

const mapDispatchToProps=(dispatch)=>{
	return {
		handleProductDetail:(productId)=>{
			dispatch(actionCreators.getProductDetail(productId))
		}
	}
}
const ProductDetail= Form.create()(NormalProductDetail)
export default connect(mapStateToProps,mapDispatchToProps)(ProductDetail)