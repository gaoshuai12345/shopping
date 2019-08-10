const mongoose=require('mongoose');
const page=require('../util/page.js');

const ProductSchema=new mongoose.Schema({//前台购物车单个商品所需字段
	productId:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'Product'
	},
	price:{
		type:Number
	},
	name:{
		type:String
	},
	images:{
		type:String
	},
	count:{
		type:Number,
		default:1
	},
	totalPrice:{
		type:Number,
		default:0
	},
	checked:{
		type:Boolean,
		default:true
	}
})
const ShippingSchema=new mongoose.Schema({//前台购物车所有商品所需字段
	shippingId:{
		type:String
	},
	name:{
		type:String
	},
	phone:{
		type:String
	},
	province:{
		type:String
	},
	city:{
		type:String
	},
	address:{
		type:String
	},
	zip:{
		type:String
	}
})
const roles=new mongoose.Schema({
		user:{
			type:mongoose.Schema.Types.ObjectId,
			ref:'User'
		},
		orderNo:{//订单号
			type:String
		},
		payment:{//z支付金额
			type:Number
		},
		paymentType:{
			type:String,
			enum:["10","20"],//枚举：：：  10-支付宝 20-微信
			default:"10"
		},
		paymentTypeDesc:{
			type:String,
			enum:["支付宝","微信"],
			default:"支付宝"
		},
		paymentTime:{
			type:Date,
		},
		status:{ 
			type:String,                     //用相隔10个数字的整数主要是为了以后或许可能在两个环节中添加细致的环节，需要取值在两个环节所对应的值之间
			enum:["10","20","30","40","50"],//10-未支付 20-取消 30-已支付 40-已发货 50-已收货
			default:"10"
		},
		statusDesc:{
			type:String,                     
			enum:["未支付","取消","已支付","已发货","已收货"],
			default:"未支付" 
		},
		shipping:{//配送信息  并不能之存储地址id,因为地址是可以删除的，如果过一阵子想要回来查看购买过的商品的订单时，订单的地址信息就会错误
			type:ShippingSchema,
		},
		productList:{         //不能存储id的原因同上
			type:[ProductSchema],
			default:[]
		}
},{
	timestamps:true
});


roles.statics.getPageOrders=function(pageNum,query={}){
	return new Promise((resolve,reject)=>{
		let options={
			page:pageNum,
			model:this,
			query:query,
			sort:{_id:-1},
			projection:'-__v',
			populate:{}
		}
		page(options)
		.then((data)=>{
			resolve(data);
		})
	})
	
}

const orderModel=mongoose.model('Order',roles);//Cate会数据库blog中生成cates集合

module.exports=orderModel;