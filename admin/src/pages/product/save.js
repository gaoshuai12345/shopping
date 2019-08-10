import React,{ Component } from 'react'
import Layout from 'common/layout'
import { Form, Input,Select,Button,InputNumber} from 'antd'

const FormItem = Form.Item;
const Option = Select.Option;

import {connect} from 'react-redux'
import { actionCreators } from './store'
import CategorySelector from './category-selector.js'

import UploadImage from 'common/upload-image'
import RichEditor from 'common/rich-editor'

import {UPLOAD_PRODUCT_IMAGE,UPLOAD_PRODUCT_DETAIL_IMAGE} from 'api'


class NormalProductSave extends Component{
   constructor(props){
		super(props)
		this.handleSubmit=this.handleSubmit.bind(this)
		console.log('save cons...')//显示父组件与组件间不同生命周期函数执行的先后顺序
   }
   componentDidMount(){
   		if(this.props.match.params.productId){
   			this.props.handleEditProduct(this.props.match.params.productId)
   		}
   }
   handleSubmit(e){
	    e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	      // if (!err) {                    //用于校验规则判断  

	      	// console.log(values)       //values中只包含antd原装插件的value,对于被改动的或自己封装的插件，获取不到value
	      	if(this.props.match.params.productId){
	      		values.id=this.props.match.params.productId
	      	}
	      	this.props.handleSave(err,values);
	      // }
	    });
   }
	render(){
		const { getFieldDecorator } = this.props.form;//获取表单values的时候用到
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
		if(this.props.imagePath){//写条件因为，imagepath就算没有值时也可以用split分割出一个数组，只有一个值，值为空字符串'',会影响数据
			fileList=this.props.imagePath.split(',').map((img,index)=>({
				uid:index,
				status: 'done',
				url:img,
				response:img
			}))
		}
		return(
			<Layout>
			  <div >
				<Form>
					<FormItem
			          {...formItemLayout}
			          label="商品名称"
			        >
			          {getFieldDecorator('name', {
			            rules: [{
			              required: true, message: '请输入商品名称!',
			            }],
			            initialValue:this.props.name,
			          })(
			            <Input 
			            	placeholder='商品名称'
			            />
			          )}
			        </FormItem>
			        <FormItem
			          {...formItemLayout}
			          label="商品描述"
			        >
			          {getFieldDecorator('description', {
			            rules: [{
			              required: true, message: '请输入商品描述!',
			            }],
			            initialValue:this.props.description,
			          })(
			            <Input 
			            	placeholder='商品描述'
			            />
			          )}
			        </FormItem>
			        <FormItem
			          {...formItemLayout}
			          label="商品价格"
			        >
			          {getFieldDecorator('price', {
			            rules: [{
			              required: true, message: '请输入商品价格!',
			            }],
			            initialValue:this.props.price,
			          })(
			            <InputNumber 
			            	formatter={value => `${value}元`}
			            	parser={value => value.replace('元', '')}
			            />
			          )}
			        </FormItem>
			        <FormItem
			          {...formItemLayout}
			          label="商品库存"
			        >
			          {getFieldDecorator('stock', {
			            rules: [{
			              required: true, message: '请输入商品库存!',
			            }],
			            initialValue:this.props.stock,
			          })(
			            <InputNumber 
			            	formatter={value => `${value}件`}
			            	parser={value => value.replace('件', '')}
			            />
			          )}
			        </FormItem>
			        <FormItem              //自行填写验证规则
			          {...formItemLayout}
			          required={true}
			          validateStatus={this.props.categoryId_validateStatus}
			          help={this.props.categoryId_help}
			          label="所属分类"
			        >
			          <CategorySelector                      //注意传递写法 {  }
			          		getCategoryId={(parentCategoryId,categoryId)=>{  
			          			// console.log(parentCategoryId,categoryId)
			          			this.props.handleCategoryId(parentCategoryId,categoryId)
			          		}}
			          		parentCategoryId={this.props.parentCategoryId}//两个父Id不同，一个是添加商品时传回来用于保存数据的，另一个是编辑商品时传过去用于显示所属分类的
			          		categoryId={this.props.categoryId}   //两个子Id也不同
			          />
			        </FormItem>
			        <FormItem
			          {...formItemLayout}
			          required={true}//五角星必填标志
			          validateStatus={this.props.images_validateStatus}
			          help={this.props.images_help}
			          label="商品图片"
			        >
			         <UploadImage                        //组件名首字母必须大写
			         	max={5}						     //向组件传递参数max,接收用this.props.max
			         	action={UPLOAD_PRODUCT_IMAGE}    //传递参数action,接收用{this.props.action}
			        	getImageFilePath={(filePath)=>{
			        		this.props.handleImages(filePath)
			        	}}
			        	fileList={fileList}
			         />    
			        </FormItem>
			        <FormItem
			          {...formItemLayout}
			          label="商品详情"
			        >
			          <RichEditor
			          	url={UPLOAD_PRODUCT_DETAIL_IMAGE}
			          	getRichEditorValue={(value)=>{
			          		this.props.handleEditorValue(value)
			          	}}
			          	detail={this.props.detailValue}//新建商品打卡页面时，不会有detail，只有触发了change事件才有
			          />

			        </FormItem>
			        <FormItem {...tailFormItemLayout}>
			          <Button 
			          type="primary"
			          onClick={this.handleSubmit}
			          loading={this.props.isAddFetching}
			          >
			          	提交
			          </Button>
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
		images_validateStatus:state.get('product').get('images_validateStatus'),
		images_help:state.get('product').get('images_help'),

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
		handleSave:(err,values)=>{
			const action=actionCreators.saveProductAction(err,values);
			dispatch(action)
		},
		handleCategoryId:(parentCategoryId,categoryId)=>{
			dispatch(actionCreators.getSetCategoryId(parentCategoryId,categoryId))
		},
		handleImages:(filePath)=>{
			dispatch(actionCreators.getSetImages(filePath))
		},
		handleEditorValue:(value)=>{
			dispatch(actionCreators.getSetEditorValue(value))
		},
		handleEditProduct:(productId)=>{
			dispatch(actionCreators.getProductDetail(productId))
		}
	}
}
const ProductSave= Form.create()(NormalProductSave)
export default connect(mapStateToProps,mapDispatchToProps)(ProductSave)