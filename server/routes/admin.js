const Router=require('express').Router;
const router=Router();
const userModel=require('../models/user.js');
const orderModel=require('../models/order.js');
const productModel=require('../models/product.js');
const page=require('../util/page.js');
const hmac=require('../util/hmac.js')
const fs=require('fs');
const path=require('path')


router.get('/init',(req,res)=>{//必须在127.0.0.1:3000请求
	new userModel({
		username:'admin',
		password:hmac('admin'),
		isAdmin:true
	})
	.save((err,newUser)=>{
		if(!err){
			res.send('ok');
		}
		else{
			res.send('error');
		}
	})
})

router.post('/login',(req,res)=>{//点击登录发送了登录请求
	let body=req.body;
	var result={
		code:0,
		errMessage:''
	}
	userModel
	.findOne({username:body.username,password:hmac(body.password),isAdmin:true})
	.then((user)=>{
		if(user){
			req.session.userInfo={
				_id:user._id,
				username:user.username,
				isAdmin:user.isAdmin
			}
			result.data={
				username:user.username
			}
			res.json(result);
		}
		else{
			result.code=1;
			result.errMessage='用户名或密码错误';
			res.json(result);
		}
	})
})

router.use((req,res,next)=>{//防止直接在地址栏请求/admin后登陆到管理员界面
	// console.log('1::',req.userInfo)
	if(req.userInfo.isAdmin){//用了withCredentials: true后，登录信息才会保存在req上
		next()
	}
	else{
		res.send({
			code:10//返回code=10,还会根据code进行下一步操作
		})
	}
})

router.get('/count',(req,res)=>{//后台获取用户数，订单数和商品数
	userModel.find()
	.then(user=>{
		orderModel.find()
		.then(order=>{
			productModel.find()
			.then(product=>{
				res.json({
					code:0,
					data:{
						usernum:user.length,
						ordernum:order.length,
						productnum:product.length
					}
				})
			})
		})
	})
	
})

router.get('/users',(req,res)=>{//请求用户列表
	let options={
		page:req.query.page,
		model:userModel,
		query:{},
		sort:{_id:-1},
		projection:'',
	}
	page(options)
	.then((data)=>{//不需要像以前渲染模板了，只需要传出数据，所以还需改动page插件
		res.json({
			code:0,
			data:{
				current:data.current,
				pageSize:data.pageSize,
				total:data.total,
				list:data.list
			}
			
		})
	})
})










router.get('/',(req,res)=>{//请求管理元首页
	// res.send('ok')
	res.render('admin/index',{
		userInfo:req.userInfo
	})
})

router.get('/loginOut',(req,res)=>{//管理员退出
	var result={
		code:0,
		errMessage:''
	}
	req.session.destroy();
	res.json(result);
})


router.get('/comments',(req,res)=>{
	commentModel.getPageComments(req)
	.then(data=>{
		res.render('admin/comments',{
			userInfo:req.userInfo,
			comments:data.docs,
			page:data.page,
			pages:data.pages,
			lists:data.list
		})

	})
})
router.get('/comment/delete/:id',(req,res)=>{
	let id =req.params.id;
	commentModel.remove({_id:id})
	.then((cate)=>{
		if(cate){
			res.render('admin/success',{
				userInfo:req.userInfo,
				message:'删除评论成功',
				url:'/admin/comments'//点击跳转
			})
		}
		else{
			res.render('admin/error',{
				userInfo:req.userInfo,
				message:'删除评论失败',
			})
		}
		
	})
})


router.get('/site',(req,res)=>{
	let path = __dirname+'/../site.json';
	fs.readFile(path,(err,data)=>{
		if(!err){

			let site=JSON.parse(data);
			// console.log('site:::',site)
			res.render('admin/site',{
				site:site
			})
		}
		else{
			console.log(err);
		}
	})
	
})


router.get('/updatePWD',(req,res)=>{
	res.render('admin/PWD')
})

router.post('/updatePWD',(req,res)=>{
	// console.log(req.body)
	let body=req.body;
	userModel.findOne({username:body.username,password:hmac(body.oldPwd)})
	.then((user)=>{
		if(user){
			// console.log(user)
			userModel.update({_id:user._id},{password:hmac(body.newPwd)},(err,raw)=>{
					if(!err){
						req.session.destroy();
						res.render('admin/success',{
							// userInfo:req.userInfo,
							message:'密码已修改，点击后重新登录',
							url:'/'//点击跳转
						})
					}
					else{
						res.render('admin/error',{
							userInfo:req.userInfo,
							message:'修改密码失败',
						})
					}

				
			})
		}
		else{
			res.render('admin/error',{
				userInfo:req.userInfo,
				message:'修改密码失败',
			})
		}
	})
	.catch(e=>{
		console.log(e);
	})
})



router.post('/site',(req,res)=>{
	let body=req.body;
	console.log(body)
	console.log(body.name)
	let site={
		name:body.name,
		author:{
			authorName:body.authorName,
			authorIntro:body.authorIntro,
			authorImage:body.authorImage,
			wechat:body.wechat
		}
	}
	site.carousels=[];
	if(typeof body.carouselUrl =='object'&& body.carouselUrl.length){
		for(var i=0;i<body.carouselUrl.length;i++){
			site.carousels.push({//因为carouselUrl与carouselPath数据是共通的
				url:body.carouselUrl[i],
				path:body.carouselPath[i]
			})
		}
	}
	else{
		site.carousels.push({
			url:body.carouselUrl,
			path:body.carouselPath
		})
	}
	site.ads=[];
	console.log(typeof body.adUrl)
	if(typeof body.adUrl =='object'&&body.adUrl.length){
		for(var i=0;i<body.adUrl.length;i++){
			site.ads.push({//因为adUrl与adPath数据是共通的
				url:body.adUrl[i],
				path:body.adPath[i]
			})
		}
	}
	else{
		site.ads.push({
			url:body.adUrl,
			path:body.adPath
		})
	}

	let str=JSON.stringify(site);
	console.log(str);
	let path = __dirname+'/../site.json';
	fs.writeFile(path,str,(err,data)=>{
		if(!err){
			res.render('admin/success',{
				userInfo:req.userInfo,
				message:'更改站点信息成功',
				url:'/admin/site'//点击跳转
			})
		}
		else{
			res.render('admin/error',{
				userInfo:req.userInfo,
				message:'更改站点信息失败',
			})
		}
	})

})
module.exports=router;