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
router.get('/',(req,res)=>{
	let orderNo=req.query.orderNo;//这里真正的操作是将此orderNo传给支付宝官方接口，由支付宝返回付款吗，但这里不具备条件做不了此操作，所以自己直接返回一个二维码
	userModel.findById(req.userInfo._id)
	.then(user=>{
		res.json({
			code:0,
			data:"http://127.0.0.1:3000/images/payment/pay.png"//注意不要写public文件夹，public是度武器默认存储静态资源的
		})
	})
	.catch(e=>{
		res.json({
			code:1,
			errMessage:'未获取到支付码信息'
		})
	})
})
router.put('/changePaymentStatus',(req,res)=>{
	orderModel.findOneAndUpdate(
		{orderNo:req.body.orderNo},
		{status:'30',statusDesc:'已支付'},
		{new:true}
	)
	.then(order=>{
		if(order){
			res.json({
				code:0
			})
		}
		else{
			res.json({
				code:1,
				errMessage:'更改支付状态失败，未找到相关订单信息'
			})
		}
		
	})
	.catch(e=>{
		res.json({
			code:1,
			errMessage:'更改支付状态失败'
		})
	})
})
router.get('/getPaymentStatus',(req,res)=>{
	orderModel.findOne({orderNo:req.query.orderNo,user:req.userInfo._id})
	.then(order=>{
		res.json({
			code:0,
			data:order.status==30
		})
	})
	.catch(e=>{
		res.json({
			code:1,
			errMessage:'更改支付状态失败'
		})
	})
})


module.exports=router;