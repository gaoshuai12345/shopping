import React,{ Component } from 'react'
import { getUserName } from 'util'
import Layout from 'common/Layout'
import { actionCreators } from './store'
import {connect} from 'react-redux';

import { Table,Breadcrumb } from 'antd'
import  moment  from 'moment'
 

const columns = [
	{
	  title: '用户名',
	  dataIndex: 'username',
	  key: 'username',
	}, 
	{
	  title: '管理员权限',
	  dataIndex: 'isAdmin',
	  key: 'isAdmin',
	  // render:()=>{ isAdmin?'是':'否'}
	  render:isAdmin=>(isAdmin?'是':'否')
	},
	{
	  title: '邮箱',
	  dataIndex: 'email',
	  key: 'email',
	}, 
	{
	  title: '手机',
	  dataIndex: 'phone',
	  key: 'phone',
	},
	{
	  title: '注册时间',
	  dataIndex: 'createdAt',
	  key: 'createdAt',
	}
]

class User extends Component{
	constructor(props){
		super(props);
		
	}
	componentDidMount(){
		this.props.getUsers(1);
	}
	render(){
		const data=this.props.list.map((user)=>{//immutable对象上的map方法
			return {
				key:user.get('_id'),
				username:user.get('username'),
				isAdmin:user.get('isAdmin'),
				email:user.get('email'),
				phone:user.get('phone'),
				createdAt:moment(user.get('createdAt')).format('YYYY-MM-DD HH:mm:ss')
			}
		}).toJS()//toJs是immutable对象转换为数组的方法
		return(
			<div>
				<Layout>
					<Breadcrumb>
				    <Breadcrumb.Item><i>用户管理</i></Breadcrumb.Item>
				    <Breadcrumb.Item><i>用户列表</i></Breadcrumb.Item>
				  </Breadcrumb>
					<Table 
					dataSource={data} //列表页显示的内容都是这里的data提供,而data是由后台根据相应请求传来的数据，这样就形成了后端分页
					columns={columns}
					pagination ={//什么都不配置也可以,但那必定是前端分页，一次会请求所有数据，若数据过于庞大则不合适
						{
							current:this.props.current,
							defaultCurrent:1,
							pageSize:this.props.pageSize,//虽然是个常量，但分页分多少页需要根据它的值，而它的值来自后台
							total:this.props.total//虽然是个常量，但分页分多少页需要根据它的值，而它的值来自后台
						}
					}
					onChange={
						(pagination)=>{
							// console.log(':::::',pagination)
							this.props.getUsers(pagination.current);
						}
					}
					loading={
						// true
						{
							spinning:this.props.isFetching,
							tip:'拼命加载中'
						}
					}
					/>
				</Layout>
			</div>
		)
	}
}

const mapStateToProps=(state)=>{
	return{
		isFetching:state.get('user').get('isFetching'),
		current:state.get('user').get('current'),
		defaultCurrent:state.get('user').get('defaultCurrent'),
		pageSize:state.get('user').get('pageSize'),
		total:state.get('user').get('total'),
		list:state.get('user').get('list')
	}
}

const mapDispatchToProps=(dispatch)=>{
	return{
		getUsers:(page)=>{
			const action=actionCreators.getUsersAction(page);
			dispatch(action)
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(User)