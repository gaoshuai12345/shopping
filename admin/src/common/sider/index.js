import React,{ Component } from 'react'
import { Layout,Menu,Icon} from 'antd';
import { NavLink } from 'react-router-dom'
import './index.css'

const { Sider } = Layout;
 
class MySider extends Component{
	render(){
		/*
			NavLink会给选中的项加一个类(active)，而Link不会，想要
			改变一些引入组件的默认样式，可以采用用自己的样式替换掉
			默认样式的方法，结合NavLink的active类设置选中样式
		*/
		return(
			<div className='Sider'>
		      <Sider width={200} style={{ background: '#fff' }}>
		        <Menu
		          mode="inline"
		          defaultOpenKeys={['sub1']}
		          style={{ height: '100%', borderRight: 0 }}
		        >
		            <Menu.Item key="1">
		            	<NavLink exact to='/'>
		            		<Icon type="home"/>首页
		            	</NavLink>
		            </Menu.Item>
		            <Menu.Item key="2">
		            	<NavLink to='/user'>
		            		<Icon type="user"/>用户列表
		            	</NavLink>
		            </Menu.Item>
		            <Menu.Item key="3">
		            	<NavLink to='/category'>
		            		<Icon type="book"/>分类管理
		            	</NavLink>
		            </Menu.Item>
		            <Menu.Item key="4">
		            	<NavLink to='/product' type="bars">
		            		<Icon type="bars"/>商品管理
		            	</NavLink>
		            </Menu.Item>
		            <Menu.Item key="5">
		            	<NavLink to='/order'>
		            		<Icon type="shop"/>订单管理
		            	</NavLink>
		            </Menu.Item>
		        </Menu>
		      </Sider>
			</div>
		)
	}
}


export default MySider