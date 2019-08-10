import React,{ Component } from 'react'
import { getUserName } from 'util'
import Layout from 'common/Layout'
import { Card } from 'antd';
import { connect } from 'react-redux'
import { actionCreators } from './store'

import './index.css'


class Home extends Component{
	componentDidMount(){

		this.props.getCount();
	}

	render(){
		return(
			<div className="Home">
				<Layout>
					<Card title="用户数" hoverable>
				    <p>{this.props.usernum}</p>
					</Card>
					<Card title="订单数" hoverable>
				    <p>{this.props.ordernum}</p>
					</Card>
					<Card title="商品数" hoverable>
				    <p>{this.props.productnum}</p>
					</Card>
				</Layout>
			</div>
		)
	}
}

const mapStateToProps=(state)=>{
	return{
			usernum:state.get('home').get('usernum'),
			ordernum:state.get('home').get('ordernum'),
			productnum:state.get('home').get('productnum')
	}
}

const mapDispatchToProps=(dispatch)=>{
	return{
		getCount:()=>{
			const action =actionCreators.getCountAction();
			dispatch(action);
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)