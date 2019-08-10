import React,{ Component } from 'react'
import Layout from 'common/layout'
import { Form, Input,Select,Button} from 'antd'
import {connect} from 'react-redux'
import { actionCreators } from './store'


import './index.css'

const FormItem = Form.Item;
const Option = Select.Option;

class NormalCategoryAdd extends Component{
   constructor(props){
		super(props)
		this.handleSubmit=this.handleSubmit.bind(this)
   }
   componentDidMount(){
   		this.props.getCategories()
   }
   handleSubmit(e){
	    e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	      if (!err) {
	      	this.props.handleAdd(values);
	      }
	    });
	}
	render(){
		const { getFieldDecorator } = this.props.form;//获取表单values的时候用到

    	const formItemLayout = {
	      labelCol: {
	        xs: { span: 24 },
	        sm: { span: 8 },
	      },
	      wrapperCol: {
	        xs: { span: 24 },
	        sm: { span: 16 },
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

		return(
			<Layout>
				<div className="category">
					<Form>
						<FormItem
				          {...formItemLayout}
				          label="分类名称"
				        >
				          {getFieldDecorator('name', {
				            rules: [{
				              required: true, message: '请输入分类名称!',
				            }],
				          })(
				            <Input />
				          )}
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="所属分类"
				        >
				          {getFieldDecorator('pid', {
				            rules: [{
				              required: true, message: '请选择父级分类!',
				            }],
				          })(		//defaultValue被替代
				             <Select initialValue="0"  style={{ width: 300 }}>
						      <Option value="0">根分类</Option>
						      {
						      	this.props.categories.map((category)=>{
						      		return <Option key={category.get('_id')} value={category.get('_id')}>根分类/{category.get('name')}</Option>
						      	})
						      }
						    </Select>

				          )}
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
		isAddFetching:state.get('category').get('isAddFetching'),
		categories:state.get('category').get('categories')
	}
}
const mapDispatchToProps=(dispatch)=>{
	return {
		handleAdd:(values)=>{
			const action=actionCreators.addCategoryAction(values);
			dispatch(action)
		},
		getCategories:()=>{
			dispatch(actionCreators.getAddCategoriesAction())
		}
	}
}


const CategoryAdd= Form.create()(NormalCategoryAdd)
export default connect(mapStateToProps,mapDispatchToProps)(CategoryAdd);