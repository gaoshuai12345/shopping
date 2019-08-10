import React,{ Component } from 'react'
import Layout from 'common/layout'
import {Button,Popconfirm} from 'antd'


import {connect} from 'react-redux'
import { actionCreators } from './store'
import moment from 'moment'

import './detail.css'


class OrderDetail extends Component{
   constructor(props){
		super(props)
   }
   componentDidMount(){
   		if(this.props.match.params.orderNo){
   			this.props.handleOrderDetail(this.props.match.params.orderNo)
   		}
   }
	render(){
		const {            //注意const {}
			orderNo,
			shipping,
			createdAt,
			payment,
			status,
			statusDesc,
			paymentTypeDesc,
			productList
		}=this.props.orderDetail
		let createdTime='';
		if(createdAt){
			createdTime=moment(createdAt).format('YYYY-MM-DD HH:mm:ss')
		}
		return(
			<Layout>
			{
			orderNo
			? <div className="order-detail">
				 <div className="panel">
					<h2 className="panel-header">
						订单信息
					</h2>
					<div className="panel-body">
						<ul className="order-info">
							<li className="order-orderNo">
								<span className="lable">
									订单编号:
								</span>
								<span className="text">
									{orderNo}
								</span>
							</li>
							<li className="order-user">
								<span className="lable">
									收件人:
								</span>
								<span className="text">
									{shipping.name}
								</span>
							</li>
							<li className="order-user">
								<span className="lable">
									收件地址:
								</span>
								<span className="text">
									{shipping.address}
								</span>
							</li>
							<li className="order-createdTime">
								<span className="lable">
									创建时间:
								</span>
								<span className="text">
									{createdTime}
								</span>
							</li>
							<li className="order-payment">
								<span className="lable">
									支付金额:
								</span>
								<span className="text">
									￥{payment}
								</span>
							</li>
							<li className="order-paymentStatusDesc">
								<span className="lable">
									支付状态:
								</span>
								<span className="text">
									{statusDesc}
								</span>
							</li>
							<li className="order-paymentTypeDesc">
								<span className="lable">
									支付方式:
								</span>
								<span className="text">
									{paymentTypeDesc}
								</span>
							</li>
							<li 
							className="order-opreation"
							>
								{
									status=="30"
									?<Popconfirm 
									  placement="right" 
									  title={'確定要發貨嗎'} 
									  onConfirm={()=>{
									  	this.props.handleChangeStatus(orderNo)
									  }} 
									  okText="確定" cancelText="取消"
									 >
								        <Button type="primary">发货</Button>
								     </Popconfirm>



									:null
								}
							</li>
						</ul>

					</div>
				  </div>
				  <div className="panel">
					<h2 className="panel-header">
						商品详情
					</h2>
					<div className="panel-body">
						<ul className="product-title clearfix">
							<li className="product-info">
								<span>商品</span>
							</li>
							<li className="product-price">
								<span>单价</span>
							</li>
							<li className="product-count">
								<span className="product-countMenu-text">数量</span>
							</li>
							<li className="product-total-price">
								<span>小计</span>
							</li>
						</ul>
						{
							productList.map((product,index)=>{
								console.log(product)
								return <ul className="product-item  clearfix" key={index}>
									<li className="product-info">
										<a href={"/product/detail/"+product.productId} className="link" target="_blank">
											<img src={product.images.split(',')[0]} alt=""/>
											<span className="product-info-text">{product.name}</span>
										</a>
									</li>
									<li className="product-price">
										<span>￥{product.price}</span>
									</li>
									<li className="product-count">
										<span>{product.count}</span>
									</li>
									<li className="product-total-price">
										<span>￥{product.totalPrice}</span>
									</li>
								</ul>
							})
						}
						
					</div>
				  </div>
			  </div>
				:null
			}
			  
			</Layout>
		)
	}
}
const mapStateToProps=(state)=>{
	return{
		orderDetail:state.get('order').get('orderDetail')
	}
}

const mapDispatchToProps=(dispatch)=>{
	return {
		handleOrderDetail:(orderNo)=>{
			dispatch(actionCreators.getOrderDetail(orderNo))
		},
		handleChangeStatus:(orderNo)=>{
			dispatch(actionCreators.changeOrderStatus(orderNo))
		}
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(OrderDetail)