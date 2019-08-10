import React,{ Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

import Header from 'common/header'
import Sider from 'common/sider'

const { Content } = Layout;
 
class MyLayout extends Component{
	render(){
		return(
			<div>
				<Layout>
			    <Header />
			    <Layout>
			    	<Sider/>
			      <Layout style={{ padding: '0 24px 24px' }}>
			        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
			          {this.props.children}
			        </Content>
			      </Layout>
			    </Layout>
			  </Layout>,
			</div>
		)
	}
}


export default MyLayout