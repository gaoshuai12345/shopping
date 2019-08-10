const mongoose=require('mongoose');
const page=require('../util/page.js');
const roles=new mongoose.Schema({
		name:{
			type:String
		},
		description:{//所属分类
			type:String
		},
		price:{
			type:Number
		},
		stock:{
			type:Number
		},
		status:{
			type:String,
			default:0             //0——>在售状态，1——>下架
		},
		order:{
			type:Number,
			default:0
		},
		category:{
			type:mongoose.Schema.Types.ObjectId,
			ref:'Cate'
		},
		imagePath:{
			type:String
		},
		detail:{
			type:String,
		}
},{
	timestamps:true
});


roles.statics.getPageProducts=function(pageNum,query={},projection='name price _id status order',sort={order:-1}){
	return new Promise((resolve,reject)=>{
		let options={
			page:pageNum,
			model:this,
			query:query,
			sort:sort,
			projection:projection,
			populate:{}
		}
		page(options)
		.then((data)=>{
			resolve(data);
		})
	})
	
}

const productModel=mongoose.model('Product',roles);//Cate会数据库blog中生成cates集合

module.exports=productModel;