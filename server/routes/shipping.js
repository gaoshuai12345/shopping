const Router=require('express').Router;
const router=Router();
const userModel=require('../models/user.js');
const hmac=require('../util/hmac.js')
const productModel=require('../models/product.js')

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

//新增地址
router.post('/',(req,res)=>{
	let body=req.body;
	userModel.findById(req.userInfo._id)
	.then(user=>{
		if(user.shipping){
			user.shipping.push(body)
		}
		else{
			user.shipping=[body]
		}
		user.save()
		.then(newUser=>{
			res.json({
				code:0,
				data:user.shipping
			})
		})
	})
	.catch(e=>{
		res.json({
				code:1,
				errMessage:'获取订单地址时服务器发生错误'
			})
	})
})
//获取所有地址信息
router.get('/list',(req,res)=>{
	userModel.findById(req.userInfo._id)
	.then(user=>{
		res.json({
			code:0,
			data:user.shipping
		})
	})
	.catch(e=>{
		res.json({
				code:1,
				errMessage:'获取订单地址时服务器发生错误'
			})
	})
})
//获取对应id的地址信息
router.get('/',(req,res)=>{
	userModel.findById(req.userInfo._id)
	.then(user=>{
		let shipping=user.shipping.id(req.query.shippingId)
		res.json({
			code:0,
			data:shipping
		})
	})
	.catch(e=>{
		res.json({
				code:1,
				errMessage:'获取对应订单地址时服务器发生错误'
			})
	})
})
//删除对应id地址
router.put('/delete',(req,res)=>{
	let body=req.body;
	userModel.findById(req.userInfo._id)
	.then(user=>{
		if(user){
			// let newShippings=user.shipping.filter(item=>{
			// 	return item._id!=body.shippingId
			// })
			// user.shipping=newShippings;

			//简便方法
			user.shipping.id(body.shippingId).remove();
			user.save()
			.then(newUser=>{
				res.json({
					code:0,
					data:user.shipping
				})
			})
			
		}
		else{
			res.json({
				code:1,
				errMessage:'未找到相关用户信息'
			})
		}
	})
	.catch(e=>{
		res.json({
				code:1,
				errMessage:'获取订单地址时服务器发生错误'
			})
	})
})
//编辑对应id地址
router.put('/edit',(req,res)=>{
	let body=req.body;
	userModel.findById(req.userInfo._id)
	.then(user=>{
		if(user){
			let shipping=user.shipping.id(body.id);
			shipping.name=body.name;
			shipping.phone=body.phone;
			shipping.province=body.province;
			shipping.city=body.city;
			shipping.address=body.address;
			shipping.zip=body.zip;
			user.save()
			.then(newUser=>{
				res.json({
					code:0,
					data:user.shipping
				})
			})
			
		}
		else{
			res.json({
				code:1,
				errMessage:'未找到相关用户信息'
			})
		}
	})
	.catch(e=>{
		res.json({
				code:1,
				errMessage:'获取订单地址时服务器发生错误'
			})
	})
})


module.exports=router;