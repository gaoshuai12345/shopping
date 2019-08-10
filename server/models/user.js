const mongoose=require('mongoose');
const productModel=require('./product.js')

const CartItemSchema=new mongoose.Schema({//前台购物车单个商品所需字段
	productId:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'Product'
	},
	count:{
		type:Number,
		default:1
	},
	price:{
		type:Number,
		default:0
	},
	checked:{
		type:Boolean,
		default:true
	}
})
const CartSchema=new mongoose.Schema({//前台购物车所有商品所需字段
	cartList:{
		type:[CartItemSchema]
	},
	allChecked:{
		type:Boolean,
		default:true
	},
	totalPrice:{
		type:Number,
		default:0
	}
})
const ShippingSchema=new mongoose.Schema({//前台购物车所有商品所需字段
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

const UserSchema=new mongoose.Schema({
		username:{
			type:String
		},
		password:{
			type:String,
		},
		isAdmin:{
			type:Boolean,//必须是Boolean，否则后边对管理员的判断会有问题
			default:false
		},
		email:String,
		phone:String,
		cart:{                 //每个用户绑定一个购物车（这种写法mongoose特有，其他数据库需要新建对应model）
			type:CartSchema
		},
		shipping:{
			type:[ShippingSchema]
		}
	},{
		timestamps:true//（包含了createdAt和updatedAt）
	});

UserSchema.methods.getCart=function(){
	return new Promise((resolve,reject)=>{
		var _this=this;
		if(!this.cart){
			resolve({
				cartList:[]
			})
		}
		let getCartItems=()=>{//因为是箭头函数，所以this指向没问题
			return this.cart.cartList.map(cartItem=>{//map指向地址
				return productModel.findById(cartItem.productId,'_id name price count imagePath')
				.then(product=>{
					cartItem.productId=product;
					cartItem.price=product.price*cartItem.count;
					return cartItem
				})
			})
		}
		Promise.all(getCartItems())//promise为异步执行，all是为了确保getCartItems中每一项都执行完毕
		.then(cartItems=>{
			// this.cart.cartList=cartItems;
			let uncheckedItem=cartItems.find((item)=>{
				return item.checked==false
			})
			if(uncheckedItem){
				_this.cart.allChecked=false;
			}else{
				_this.cart.allChecked=true;
			}
			cartItems.forEach(item=>{
				if(item.checked){
					_this.cart.totalPrice+=item.price
				}
			})
			resolve(_this.cart)
		})
		
		
	})
}
UserSchema.methods.getOrderProductList=function(){
	return new Promise((resolve,reject)=>{
		var _this=this;
		if(!this.cart){
			resolve({
				cartList:[]
			})
		}
		let newCartList=this.cart.cartList.filter(item=>{
			return item.checked
		})
		this.cart.cartList=newCartList;
		let getCartItems=()=>{//因为是箭头函数，所以this指向没问题
			return newCartList.map(cartItem=>{//map指向地址
				return productModel.findById(cartItem.productId,'_id name price count imagePath')
				.then(product=>{
					cartItem.productId=product;
					cartItem.price=product.price*cartItem.count;
					return cartItem
				})
			})
		}
		Promise.all(getCartItems())//promise为异步执行，all是为了确保getCartItems中每一项都执行完毕
		.then(cartItems=>{
			cartItems.forEach(item=>{
				if(item.checked){
					_this.cart.totalPrice+=item.price
				}
			})
			resolve(_this.cart)
		})
		
		
	})
}
const UserModel=mongoose.model('User',UserSchema);//User会在数据库blog中生成users集合

module.exports=UserModel;