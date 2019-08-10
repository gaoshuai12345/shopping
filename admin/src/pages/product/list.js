import React,{ Component } from 'react'
import Layout from 'common/layout'
import {Link} from 'react-router-dom'

import {Button,Breadcrumb,Table,Divider,InputNumber,Input, Select,Switch } from 'antd'
import {connect} from 'react-redux'
import { actionCreators } from './store'

const Search = Input.Search;

class ProductList extends Component{
	constructor(props){
		super(props)
	}
	componentDidMount(){
		this.props.getPages(1);
	}
	
	render(){
		const columns = [
			{
			  title: 'ID',
			  dataIndex: 'ID',
			  key: 'ID',
			},
			{
			  title: '商品名称',
			  dataIndex: 'name',
			  key: 'name',
			  render:(name)=>{
			  	if(this.props.keyword){
			  		let reg=new RegExp("("+this.props.keyword+")",'ig');
			  		let html=name.replace(reg,'<b style="background:yellow">$1</b>')
			  		return <span dangerouslySetInnerHTML={{__html:html}}></span>
			  	}
			  	else{
			  		return name
			  	}
			  }
			}, 
			{
			  title: '商品价格',
			  dataIndex: 'price',
			  key: 'price',
			},
			{
			  title: '排序',
			  dataIndex: 'order',
			  key: 'order',
			    render:(order,record)=>{					
			  	return <InputNumber 
			  				defaultValue={order}
			  				onBlur={(ev)=>{
			  					this.props.handleOrder(record.ID,ev.target.value)
			  				}}  
			  			/>
			  }
			},
			{
			  title: '状态',
			  dataIndex: 'status',
			  key: 'status',
			  render:(text,record)=>{          //没render之前，状态栏显示的是0或1
			  	return(
			  		<span>
			  			<Switch 
						  checkedChildren="在售" 
						  unCheckedChildren="下架" 
						  defaultChecked={record.status=='0'?true:false}//一般测验数字都用字符串类型，两等号只检验值大小，三等号还检验类型
						  onChange={(checked)=>{
						  	this.props.handleStatus(record.ID,checked?0:1)
						  }}
						  />
			  		</span>
			  	)
			  }
			},
			{
			  title: '操作',
			  key: 'action',
			  render: (text, record) => (
			  
			    <span>
			     	<Link to={'/product/save/'+record.ID}>
			     		编辑
			     	</Link>
			     	<Divider type="vertical" />
			     	<Link to={'/product/detail/'+record.ID}>
			     		查看
			     	</Link>
			    </span>
			  ),
			}
		]
		
		const data=this.props.list.map((product)=>{
			return {
				key:product.get('_id'),
				ID:product.get('_id'),
				name:product.get('name'),
				price:product.get('price'),
				order:product.get('order'),
				status:product.get('status')
			}
		}).toJS()

		return(
			<Layout>
				<Breadcrumb>
			    	<Breadcrumb.Item><i>商品管理</i></Breadcrumb.Item>
			    	<Breadcrumb.Item><i>商品列表</i></Breadcrumb.Item>
			 	</Breadcrumb>
			 	<Search
			      placeholder="请输入商品名称关键字"
			      style={{ width: 300 }}
			      enterButton
			      onSearch={value => 
			      	this.props.handleSearch(value)
			      }
			    />

				<div style={{ marginTop:'20px' }} className='clearfix'>
					<Link to='/product/save' style={{ float:'right' }}>
						<Button type="primary">新增商品</Button>
					</Link>
				</div>
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
		isPageFetching:state.get('product').get('isPageFetching'),
		current:state.get('product').get('current'),
		pageSize:state.get('product').get('pageSize'),
		total:state.get('product').get('total'),
		list:state.get('product').get('list'),
		id:state.get('product').get('id'),
		keyword:state.get('product').get('keyword')//后来添加，为了区分是所有商品分页还是搜索出来的商品分页
	}
}
const mapDispatchToProps=(dispatch)=>{
	return{
		getPages:(page)=>{
			const action=actionCreators.getPagesAction(page);
			dispatch(action)
		},
		handleOrder:(id,newOrder)=>{
			dispatch(actionCreators.updateInputOrderAction(id,newOrder))
		},
		handleStatus:(id,newStatus)=>{
			dispatch(actionCreators.updateStatusAction(id,newStatus))
		},
		handleSearch:(keyword,page)=>{
			dispatch(actionCreators.searchProductAction(keyword,page))
		}
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(ProductList);