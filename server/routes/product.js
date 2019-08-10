const Router=require('express').Router;
const router=Router();
const productModel=require('../models/product.js')

const path=require('path');
const fs=require('fs');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/product-image/')           //上传的图片存储地址，属于静态资源
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+path.extname(file.originalname))
    // console.log(file.originalname)
     // cb(null, file.fieldname + '-' + Date.now())
  }
})
const upload = multer({ storage: storage })



router.get('/loadProduct',(req,res)=>{//前端商品list页面
	let page=req.query.page;
	let projection='_id name price imagePath';

	let query={
		status:0
	}
	if(req.query.categoryId){
		query.category=req.query.categoryId
	}else{
		query.name={$regex:new RegExp(req.query.keyword,'i')}
	}

	let sort={
		order:-1
	}
	if(req.query.orderBy=='price_desc'){
		sort={
			price:-1
		}
	}else if(req.query.orderBy=='price_asc'){
		sort={
			price:1
		}
	}

	productModel.getPageProducts(page,query,projection,sort)
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
router.get('/loadProductDetail',(req,res)=>{//前端商品list页面
	let id=req.query.productId;
	productModel.findOne({status:0,_id:id},'-__v -createdAt -updatedAt -category')
	.then(product=>{
		if(product){
			res.json({
				code:0,
				data:product
			})
		}else{
			res.json({
				code:1,
				errMessage:'获取商品详情失败'
			})
		}
			
	})
	.catch(e=>{
		res.send(e);
	})
})


//权限控制，所以发送请求时必须带有withCredentials=true使cookie信息保存在req.userInfo中
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

router.post('/uploadImage', upload.single('file'),(req,res)=>{//填入file是因为前端页面发送请求的地方name(默认)="file"
	const filePath=req.file.filename
	res.send('http://127.0.0.1:3000/product-image/'+filePath); //返回一个图片的服务器地址，因为页面以后需要的是从服务器请求图片
})

router.post('/uploadDetailImage', upload.single('upload_'),(req,res)=>{//填入upload_是因为前端页面的 fileKey: 'upload_' 
	const filePath='http://127.0.0.1:3000/product-image/'+req.file.filename
	res.json({
		"success": true,
  		"msg": "上传成功",                //返回的图片的服务器地址会自动再次发送请求
 		"file_path":filePath
	})
})


router.post('/',(req,res)=>{//添加商品
	let body=req.body;
	new productModel({
		name:body.name,
		description:body.description,
		price:body.price,
		stock:body.stock,
		// parentCategoryId:body.parentCategoryId,
		category:body.category,
		imagePath:body.imagePath,
		detail:body.detailValue
	})
	.save()
	.then((newProduct)=>{
		if(newProduct){
			productModel.getPageProducts(1)
			.then((data)=>{
				res.json({
					code:0,
					data:{
						current:data.current,
						pageSize:data.pageSize,
						total:data.total,
						list:data.list
					},
					message:'添加商品信息成功'
				})
			})
			.catch(e=>{
				console.log('product(post)：：：',e)
			})
		}
		else{
			res.send({
				code:1,
				errMessage:'添加商品失败，数据库操作失败'
			})
		}
	})
	.catch((e)=>{
		res.send(e);
	})
})
router.get('/',(req,res)=>{
	let pageNum=req.query.page||1;
	productModel.getPageProducts(pageNum)
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
	.catch((e)=>{
		res.send(e);
	})
	
})
router.put('/editOrder',(req,res)=>{
	let body =req.body;
	productModel.update({_id:body.id},{order:body.newOrder},(err,raw)=>{
			if(!err){
				productModel.getPageProducts(body.page)
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
router.put('/editStatus',(req,res)=>{
	let body =req.body;
	productModel.update({_id:body.id},{status:body.newStatus},(err,raw)=>{
			if(!err){
				res.send({
					code:0,
				})
									
			}else{
				productModel.getPageProducts(body.page)
				.then((data)=>{
					res.json({
						code:1,
						message:'修改分类失败,数据库操作失败',
						data:{
							current:data.current,
							pageSize:data.pageSize,
							total:data.total,
							list:data.list
						}
					})
				})				
			}
	})
})
router.get('/detail',(req,res)=>{
	let id=req.query.id;
	productModel
	.findById(id,'-__v -status -order -createdAt -updatedAt')
	.populate({path:'category',select:'_id pid'})
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

router.put('/',(req,res)=>{//修改商品信息
	let body=req.body;
	productModel.update({_id:body.id},{
		name:body.name,
		description:body.description,
		price:body.price,
		stock:body.stock,
		category:body.category,
		imagePath:body.imagePath,
		detail:body.detailValue
	})
	.then((newProduct)=>{
		if(newProduct){
			productModel.getPageProducts(1)
			.then((data)=>{
				res.json({
					code:0,
					data:{
						current:data.current,
						pageSize:data.pageSize,
						total:data.total,
						list:data.list
					},
					message:'修改商品信息成功'
				})
			})
			.catch(e=>{
				console.log('product(post)：：：',e)
			})
		}
		else{
			res.send({
				code:1,
				errMessage:'添加商品失败，数据库操作失败'
			})
		}
	})
	.catch((e)=>{
		res.send(e);
	})
	
})

router.get('/search',(req,res)=>{
	let pageNum=req.query.page||1;
	let keyword=req.query.keyword
	productModel.getPageProducts(pageNum,{
		name:{$regex:new RegExp(keyword,'i')}//模糊查询
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




module.exports=router;