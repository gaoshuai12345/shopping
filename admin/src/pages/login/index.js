import React,{ Component } from 'react'
import { Form, Icon, Input, Button } from 'antd';
import './index.css'
import { connect } from 'react-redux'

import { actionCreators }  from './store'

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
	constructor(props){
		super(props)
		this.handleSubmit=this.handleSubmit.bind(this)
	}
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
      	this.props.handleSubmit(values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className='login'> 
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('username', {
              rules: [
               { required: true, message: '请输入用户名!' },
               {pattern:/^[a-z|\d]{3,6}$/,message:'用户名为3~6个字母或数字'}
              ],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [
               { required: true, message: '请输入密码!' },
               {pattern:/^[a-z|\d]{3,6}$/,message:'密码为3~6个字母或数字'}
              ],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            <Button 
            	type="primary" 
            	onClick={this.handleSubmit} 
            	className="login-form-button"
            	loading={ this.props.isFetching }//设置为true时，按钮不能被点击
            >
             登录
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const mapStateToProps=(state)=>{
	return{//isFetching:loading图标
		isFetching:state.get('login').get('isFetching')
	}
}

const mapDispatchToProps=(dispatch)=>{
	return{
		handleSubmit:(values)=>{//函数写法！！！！！！！！！！！！！！
				const action=actionCreators.getLoginAction(values);
				dispatch(action);
		}
	}
}

const Login=Form.create()(NormalLoginForm)
export default connect(mapStateToProps,mapDispatchToProps)(Login);
