const Router=require('express').Router;
const router=Router();
const userModel=require('../models/user.js');
const hmac=require('../util/hmac.js')
const orderModel=require('../models/order.js')

//未登录也可以获取购物车信息


//权限控制
router.use((req,res,next)=>{
	if(req.userInfo._id){
		next()
	}
	else{
		res.send({
			code:10
		})
	}
})
router.get('/home/orderProductList',(req,res)=>{
	userModel.findById(req.userInfo._id)
	.then(user=>{
		user.getOrderProductList()
		.then(cart=>{
			res.json({
				code:0,
				data:cart
			})
		})
		.catch(e=>{
			res.json({
				code:1,
				errMessage:'获取订单商品失败'
			})
		})
	})
})

router.post('/',(req,res)=>{//创建订单
	userModel.findById(req.userInfo._id)
	.then(user=>{
		let order={}
		user.getOrderProductList()//此处过滤掉了所有checked==false的商品
		.then(result=>{
			// console.log('1:::',result)
			order.payment=result.totalPrice;
			//订单的商品
			let productList=[];
			result.cartList.forEach(item=>{
				productList.push({
					productId:item.productId._id,
					count:item.count,
					totalPrice:item.price,
					price:item.productId.price,
					images:item.productId.imagePath,
					name:item.productId.name
				})
			})
			order.productList=productList;
			//订单的地址
			let shipping=user.shipping.id(req.body.shippingId)
			order.shipping={
				shippingId:shipping._id,
				name:shipping.name,
				phone:shipping.phone,
				province:shipping.province,
				city:shipping.city,
				address:shipping.address,
				zip:shipping.zip
			}

			//订单号
			order.orderNo=Date.now().toString()+parseInt((Math.random()*10000))
			
			//赋值用户ID
			order.user=user._id;
              //创建时间本地化
              // order.createdTime=new Date(order.createdAt).tolocalTime()

			new orderModel(order)
			.save()
			.then(newOrder=>{//因为上边获取的user中商品都是checked==true的，而这里是需要删除购物车中checked==true的，所以只能再次用userModal获取user
				userModel.findById(req.userInfo._id)
				.then(user=>{
					let newList=user.cart.cartList.filter(item=>{
						return item.checked==false
					})
					user.cart.cartList=newList;
					user.save()
					.then(newUser=>{
						res.json({
							code:0,
							data:newOrder
						})
					})
				})

			})
		})
		.catch(e=>{
			res.json({
				code:1,
				errMessage:'获取订单商品失败'
			})
		})
	})
})

router.get('/home',(req,res)=>{
	let page=req.query.page;
	orderModel.getPageOrders(page)
	.then(result=>{
		res.json({
			code:0,
			data:{
				current:result.current,
				pageSize:result.pageSize,
				total:result.total,
				list:result.list
			}
		})
	})
	.catch(e=>{
		res.send(e);
	})
})
router.get('/home/detail',(req,res)=>{
	orderModel.findOne({orderNo:req.query.orderNo,user:req.userInfo._id})//双重条件避免在地址栏换上别人的订单号非法操作
	.then(order=>{
		if(order){
			res.json({
				code:0,
				data:order
			})
		}
		else{
			res.json({
				code:1,
				errMessage:'获取订单详情失败！'
			})
		}
		
	})
	.catch(e=>{
		res.json({
			code:1,
			errMessage:'您的订单去火星了！'
		})
	})
})

router.put('/orderCancel',(req,res)=>{
	console.log(req.body)
	orderModel.findOneAndUpdate(
		{orderNo:req.body.orderNo,user:req.userInfo._id},
		{status:"20",statusDesc:"取消订单"},
		{new:true}//加了此条件findAndUpdate返回的才是修改后的数据，否则还是以前的数据
	)
	.then(order=>{
		if(order){
			res.json({
				code:0,
				data:order
			})
		}
		else{
			res.json({
				code:1,
				errMessage:'取消订单失败'
			})
		}
		
	})
	.catch(e=>{
		res.json({
			code:1,
			errMessage:'取消订单失败！'
		})
	})
})

//管理员权限
router.use((req,res,next)=>{
	// console.log('1::',req.userInfo)
	if(req.userInfo.isAdmin){
		next()
	}
	else{
		res.send({
			code:10
		})
	}
})
router.get('/',(req,res)=>{
	let page=req.query.page;
	orderModel.getPageOrders(page)
	.then(result=>{
		res.json({
			code:0,
			data:{
				current:result.current,
				pageSize:result.pageSize,
				total:result.total,
				list:result.list
			}
		})
	})
	.catch(e=>{
		res.send(e);
	})
})
router.get('/search',(req,res)=>{
	let pageNum=req.query.page||1;
	let keyword=req.query.keyword
	orderModel.getPageOrders(pageNum,{
		orderNo:{$regex:new RegExp(keyword,'i')}//模糊查询
	})
	.then((data)=>{
		res.json({
			code:0,
			data:{
				current:data.current,
				pageSize:data.pageSize,
				total:data.total,
				list:data.list,
				keyword:keyword
			}
		})
	})
	.catch((e)=>{
		res.send(e);
	})
})
router.get('/detail',(req,res)=>{
	let orderNo=req.query.orderNo;
	orderModel
	.findOne({orderNo:orderNo},'-__v')
	.then((data)=>{
		res.json({
			code:0,
			data:data
		})
	})
	.catch((e)=>{
		res.send(e);
	})
	
})
router.put('/changeStatus',(req,res)=>{
	let orderNo=req.body.orderNo;
	orderModel
	.findOneAndUpdate(
		{orderNo:orderNo},
		{status:"40",statusDesc:"已发货"},
		{new:true}
	)
	.then((data)=>{
		res.json({
			code:0,
			data:data
		})
	})
	.catch((e)=>{
		res.send(e);
	})
	
})

module.exports=router;