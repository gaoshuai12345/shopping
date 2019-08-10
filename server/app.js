const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const session=require('express-session')
const MongoStore = require("connect-mongo")(session);//用于cookie存储
//链接数据库
mongoose.connect('mongodb://localhost:27017/kmall',{useNewUrlParser:true});
                                   //这里创建数据库
const db=mongoose.connection;
db.on('error',()=>{
	throw error;
})
db.on('open',()=>{
	console.log('DB is connected');
})

const app=express();



//跨域设置(写在所有请求前边)
app.use((req,res,next)=>{
	res.append("Access-Control-Allow-Origin","http://localhost:8080");//8080!!!
	res.append("Access-Control-Allow-Credentials",true);
	res.append("Access-Control-Allow-Methods","GET, POST, PUT,DELETE");
	res.append("Access-Control-Allow-Headers", "Content-Type, X-Requested-With,X-File-Name"); 
	next();
})

app.use(//每一次请求时随机生成一个验证码,此验证码会在登录成功时与登陆用户绑定，并不是根据输入的用户名或密码生成的cookie
	session({
		 //设置cookie名称
		name:'KmallId',
		//用它来对session cookie签名，防止篡改
		secret:'LMZ',
		 //强制保存session即使它并没有变化
		resave:true,
		//强制将未初始化的session存储
		saveUninitialized:true,
		//cookie过期时间 1天
    	cookie:{maxAge:1000*60*60*24}, 
		//设置session存储在数据库中
   	    store:new MongoStore({ mongooseConnection: mongoose.connection }) 
	})
)

app.use((req,res,next)=>{//解决同一请求两次出现的问题
	if(req.method=='OPTIONS'){//如果请求地址为options，则不往下执行
		res.send('OPTION-OK')
	}
	else{//如果请求地址不是optionS，则往下执行
		next();
	}
})

app.use((req,res,next)=>{
	req.userInfo=req.session.userInfo||{};
	next();
})

//配置静态资源
app.use(express.static('public'));    //请求上传过的图片属于请求静态资源

//添加处理POST请求的中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



//处理路由
app.use('/admin',require('./routes/admin.js'))
app.use('/user',require('./routes/user.js'))
app.use('/category',require('./routes/category.js'))
app.use('/product',require('./routes/product.js'))
app.use('/cart',require('./routes/cart.js'))
app.use('/shipping',require('./routes/shipping.js'))
app.use('/order',require('./routes/order.js'))
app.use('/payment',require('./routes/payment.js'))






app.listen(3000,()=>{
	console.log('server is running at 127.0.0.1:3000')
})