import React,{ Component } from 'react'
import Layout from 'common/layout'
import {Link} from 'react-router-dom'

import {Button,Breadcrumb,Table,Divider,InputNumber,Input, Select,Switch } from 'antd'
import {connect} from 'react-redux'
import { actionCreators } from './store'
import moment from 'moment'


const Search = Input.Search;

class OrderList extends Component{
	componentDidMount(){
		this.props.getPages(1);
	}
	
	render(){
		const columns = [
			{
			  title: '订单编号',
			  dataIndex: 'orderNo',
			  key: 'orderNo',
			  render:(orderNo)=>{
			  	if(this.props.keyword){
			  		let reg=new RegExp("("+this.props.keyword+")",'ig');
			  		let html=orderNo.replace(reg,'<b style="background:yellow">$1</b>')
			  		return <span dangerouslySetInnerHTML={{__html:html}}></span>
			  	}
			  	else{
			  		return orderNo
			  	}
			  }
			},
			{
			  title: '收件人',
			  dataIndex: 'name',
			  key: 'name',
			}, 
			{
			  title: '支付状态',
			  dataIndex: 'statusDesc',
			  key: 'statusDesc',
			},
			{
			  title: '支付金额',
			  dataIndex: 'payment',
			  key: 'payment',
			},
			{
			  title: '创建时间',
			  dataIndex: 'createdAt',
			  key: 'createdAt',
			},
			{
			  title: '操作',
			  key: 'action',
			  render: (text, record) => (
			    <span>
			     	<Link to={'/order/detail/'+record.orderNo}>
			     		查看
			     	</Link>
			    </span>
			  ),
			}
		]
		
		const data=this.props.list.map((order)=>{
			console.log('order:::::',order)
			return {
				key:order.get('_id'),
				orderNo:order.get('orderNo'),
				name:order.get('shipping').get('name'),
				payment:order.get('payment'),
				statusDesc:order.get('statusDesc'),
				createdAt:moment(order.get('createdAt')).format('YYYY-MM-DD HH:mm:ss')
			}
		}).toJS()

		return(
			<Layout>
				<Breadcrumb>
			    	<Breadcrumb.Item><i>订单管理</i></Breadcrumb.Item>
			    	<Breadcrumb.Item><i>订单列表</i></Breadcrumb.Item>
			 	</Breadcrumb>
			 	<Search
			      placeholder="请输入订单号"
			      style={{ width: 300 }}
			      enterButton
			      onSearch={value => 
			      	this.props.handleSearch(value)
			      }
			    />
				<Table 
					dataSource={data} 
					columns={columns}
					pagination ={
						{
							current:this.props.current,
							defaultCurrent:1,
							pageSize:this.props.pageSize,
							total:this.props.total
						}
					}
					onChange={
						(pagination)=>{
							if(this.props.keyword){
								this.props.handleSearch(this.props.keyword,pagination.current)
							}
							else{
								this.props.getPages(pagination.current);
							}
							
						}
					}
					loading={
						// true
						{
							spinning:this.props.isPageFetching,
							tip:'拼命加载中'
						}
					}
					/>
			</Layout>
		)
	}
}
const mapStateToProps=(state)=>{
	return{
		isPageFetching:state.get('order').get('isPageFetching'),
		current:state.get('order').get('current'),
		pageSize:state.get('order').get('pageSize'),
		total:state.get('order').get('total'),
		list:state.get('order').get('list'),
		orderNo:state.get('order').get('orderNo'),
		keyword:state.get('order').get('keyword')//后来添加，为了区分是所有订单分页还是搜索出来的订单分页
	}
}
const mapDispatchToProps=(dispatch)=>{
	return{
		getPages:(page)=>{
			const action=actionCreators.getPagesAction(page);
			dispatch(action)
		},
		handleSearch:(keyword,page)=>{
			dispatch(actionCreators.searchOrderAction(keyword,page))
		}
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(OrderList);