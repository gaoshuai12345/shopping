const Router=require('express').Router;
const router=Router();
const CateModel=require('../models/category.js')
const page=require('../util/page.js')



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
router.post('/',(req,res)=>{//post请求
	let body=req.body;
	CateModel.findOne({name:body.name,pid:body.pid})//不仅需要判断name
	.then((cate)=>{
		if(cate){
			res.send({
				code:1,
				errMessage:'添加分类失败，分类已存在'
			})
		}
		else{
			new CateModel({
				name:body.name,
				pid:body.pid
			})
			.save()
			.then((newCate)=>{
				if(newCate){
					if(body.pid==0){//判断如果添加的是一级分类，那么要更新页面的分类列表，需要传回最新数据
						CateModel.find({pid:0},'name _id')
						.then((data)=>{
							if(data){
								res.json({
									code:0,
									data:data
								})
							}
							else{
								res.send({
									code:1,
									errMessage:'添加分类失败，数据库操作失败'
								})
							}
						})
					}
					else{
						res.json({
							code:0
						})
					}
				}
				else{
					res.send({
						code:1,
						errMessage:'添加分类失败，数据库操作失败'
					})
				}
			})
			.catch((e)=>{
				res.send(e);
			})
		}
	})
})
router.get('/',(req,res)=>{
	let pid =req.query.pid;
	let pageNum=req.query.page;
	if(pageNum){
		CateModel.getPageCategories(pageNum,{pid:pid})
		.then((data)=>{
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
	}
	else{
		CateModel.find({pid:pid},'name _id')
		.then((data)=>{
			if(data){
				res.json({
					code:0,
					data:data
				})
			}
			else{
				res.send({
					code:1,
					errMessage:'添加分类失败，数据库操作失败'
				})
			}
		})
		.catch((e)=>{
			res.send(e);
		})
	}
})

router.put('/edit',(req,res)=>{//自己认为put(post update)
	let body =req.body;
	CateModel.findOne({name:body.name,pid:body.pid})//交集
	.then((category)=>{
		if(category){
			res.send({
				code:1,
				errMessage:'修改分类失败，分类已存在'
			})
		}
		else{
			CateModel.update({_id:body.id},{name:body.name,pid:body.pid},(err,raw)=>{
				if(!err){
					CateModel.getPageCategories(body.page,{pid:body.pid})
					.then((data)=>{
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
				}else{
			 		res.send({
			 			code:1,
						message:'修改分类失败,数据库操作失败'
					})					
				}
			})
		}
	})
	.catch(e=>{
		console.log(e);
	})
})
router.put('/editOrder',(req,res)=>{
	let body =req.body;
	CateModel.update({_id:body.id},{order:body.newOrder},(err,raw)=>{
			if(!err){
				CateModel.getPageCategories(body.page,{pid:body.pid})
				.then((data)=>{
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
			}else{
		 		res.send({
		 			code:1,
					message:'修改分类失败,数据库操作失败'
				})					
			}
	})
})
















router.get('/',(req,res)=>{
	let options={
		page:req.query.page,
		model:CateModel,
		query:{},
		sort:{order:1},
		projection:'_id name order',
	}
	page(options)
	.then((data)=>{
		res.render('admin/category',{//?????????????????????不用传userInfo
			docs:data.docs,
			page:data.page,//注意page的类型是否是Number
			lists:data.list,
			pages:data.pages,//为了前端页面判断是否需要显示分页栏
			url:'/category'//为了把分页做成一个多次调用的页面->page.html
		})
	})
	
})

router.get('/add',(req,res)=>{//get请求

	res.render('admin/category_edit_add')//请求添加分类页面和请求编辑分类页面合为一个
									//区别在于一个向页面传递了一个category对象，一个没有
})




router.get('/edit/:id',(req,res)=>{//请求添加分类页面和请求编辑分类页面合为一个
	let id=req.params.id;      //区别在于一个向页面传递了一个category对象，一个没有
	CateModel.findOne({_id:id})
	.then((cate)=>{
		if(cate){
			res.render('admin/category_edit_add',{
				category:cate       
			})
		}
	})
	
})



router.get('/delete/:id',(req,res)=>{
	let id =req.params.id;
	CateModel.remove({_id:id})
	.then((cate)=>{
		if(cate){
			res.render('admin/success',{
				userInfo:req.userInfo,
				message:'删除分类成功',
				url:'/category'//点击跳转
			})
		}
		else{
			res.render('admin/error',{
				userInfo:req.userInfo,
				message:'删除分类失败',
			})
		}
	})
})
module.exports=router;