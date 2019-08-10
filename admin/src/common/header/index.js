import React,{ Component } from 'react'
import { Layout,Menu, Dropdown, Icon } from 'antd';
import './index.css'
import { request,getUserName,removeUserName } from 'util'
import  USER_LOGOUT  from 'api'

const { Header } = Layout;
 
class MyHeader extends Component{
	constructor(props){
		super(props);
		this.handleLogout=this.handleLogout.bind(this)
	}
	handleLogout(){
		request({
			url:USER_LOGOUT
		})
		.then((result)=>{
			removeUserName();
			window.location.href='/login'
		})
	}
	render(){
		const menu = (
		  <Menu >
		    <Menu.Item key="0" onClick={this.handleLogout}>
		      <Icon type="logout" />退出
		    </Menu.Item>
		  </Menu>
		);

		return(
			<div className='Header'>
			    <Header className="header">
			      <div className="logo">KMALL</div>
			       <Dropdown className="logout" overlay={menu} trigger={['click']}>
					    <a className="ant-dropdown-link" href="#" >
					     	{ getUserName() }<Icon type="down" />
					    </a>
					  </Dropdown>
			    </Header>
			</div>
		)
	}
}


export default MyHeader